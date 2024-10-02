import teacherModel from "../model/teacher.schema.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv';
dotenv.config();

const getCloudinaryConfig = JSON.parse(process.env.CLOUD_DINARY_CONFIG);
cloudinary.config(getCloudinaryConfig);

const teacherController = {
    getTeacher: async (req, res) => {
        const result = teacherModel.find();
        res.status(200).send(result);
    },

    register: async (req, res) => {
        try {
            const { email, password, teacherName } = req.body;
            const hashedPassword = bcrypt.hashSync(password, 10);
            const saveuser = await teacherModel.create({
                avatar: "https://res.cloudinary.com/dzpw9bihb/image/upload/v1726676632/wgbdsrflw8b1vdalkqht.jpg",
                teacherName,
                email,
                password: hashedPassword,
            })
            res.status(201).send(saveuser)
        } catch (error) {
            res.status(400).send({
                message: error.message
            })
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await teacherModel.findOne({ email })
            const compare = bcrypt.compareSync(password, user.password);
            if (!compare) {
                throw new Error('Email or password is invalid!');
            }
            const token = jwt.sign({
                teacherId: user._id,
                teacherName: user.teacherName,
                email: user.email,
            }, process.env.SECRETKEY, { expiresIn: 60 * 10 })
            res.status(200).send({
                message: "Login successful",
                accessToken: token,
                teacherId: user._id,
                teacherName: user.teacherName,
                avatar: user.avatar,
                email: user.email,
                phoneNumber: user.phone,
                address: user.address,
                role: user.role,
                dateOfBirth: user.dateOfBirth,
                subjects: user.subject
            });
        } catch (error) {
            res.status(400).send({
                message: error.message
            })
        }

    },

    resetPass: async (req, res) => {
        try {
            const { email, password } = req.body;
            const hashedPassword = bcrypt.hashSync(password, 10);
            const saveuser = await teacherModel.findOneAndUpdate({ email: email }, {
                password: hashedPassword
            })
            res.status(201).send(saveuser)
        } catch (error) {
            res.status(400).send({
                message: error.message
            })
        }
    },

    forgotPass: async (req, res) => {
        try {
            const { email } = req.body;
            const existEmail = await teacherModel.findOne({ email })
            if (!existEmail) {
                throw new Error('Email does not exist!')
            }
            const newOTP = Math.floor(100000 + Math.random() * 900000);
            const newCachOtp = {
                [newOTP]: email,
            }
            res.status(200).send({
                message: "OTP sent successfully!",
                data: newCachOtp
            })
        } catch (error) {
            res.status(200).send({
                message: error.message
            })
        }
    },

    uploadAvatar: async (req, res) => {
        let avatar = req.file;
        let { email } = req.query;
        let user = await teacherModel.findOne({ email: email });
        if (user) {
            if (avatar) {
                const dataUrl = `data:${avatar.mimetype};base64,${avatar.buffer.toString('base64')}`;
                const uploaded = await cloudinary.uploader.upload(dataUrl,
                    { resource_type: 'auto' },
                    async (err, result) => {
                        if (result && result.url) {
                            user.avatar = result.url;
                            await user.save()
                            return res.status(200).json({
                                message: 'Client information updated successfully',
                                user: result.url
                            });
                        } else {
                            return res.status(500).json({
                                message: 'Error when upload file: ' + err.message
                            });
                        }
                    }
                )
            } else {
                return res.status(404).json({
                    message: 'Image not found'
                });
            }
        } else {
            return res.status(404).json({
                message: 'Client not found'
            });
        }
    },

    updateUser: async (req, res) => {
        let user = req.body;
        let teacherId = req.user.teacherId;
        let rs = await teacherModel.findByIdAndUpdate(
            teacherId,
            user
        )
        res.status(200).send(rs)
    },

    changePassword: async (req, res) => {
        try {
            let teacherId = req.user.teacherId;
            let { oldP, newP } = req.body;

            const user = await teacherModel.findById(teacherId);
            if (!user) {
                throw new Error('User not found');
            }

            const isMatch = bcrypt.compareSync(oldP, user.password);
            if (!isMatch) {
                throw new Error('Old password is incorrect');
            }

            const hashedNewPassword = bcrypt.hashSync(newP, 10);
            const newUserP = await teacherModel.findByIdAndUpdate(teacherId, {
                password: hashedNewPassword
            })

            res.status(200).send({
                message: 'Password updated successfully',
                newUserP
            });
        } catch (error) {
            res.status(400).send({
                message: error.message,
            });
        }
    },
}

export default teacherController;