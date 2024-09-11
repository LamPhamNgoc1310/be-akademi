import StudentModel from "../model/student.schema.js";
import Counter from "../model/counterID.schema.js"; 
import bcrypt from 'bcrypt';
import { v2 as cloudinary} from 'cloudinary'
import dotenv from 'dotenv';
dotenv.config();

const getCloudinaryConfig = JSON.parse(process.env.CLOUD_DINARY_CONFIG);
cloudinary.config(getCloudinaryConfig);

const studentController = {
    getListStudent: async (req, res) => {
        try {
            const students = await StudentModel.find();
            res.status(200).send(students);
        } catch (error) {
            res.status(500).send({
                message: error.message
            });
        }
    },

    updateNewStudent: async (req, res) => {
        try {
            let data = req.body;    
            let avatar = req.file;
            let student = await StudentModel.findOne({ email: data.email });

            if (student) {
                await StudentModel.updateOne({ email: data.email }, { $set: data });
                if(avatar){
                    const dataUrl = `data:${avatar.mimetype};base64,${avatar.buffer.toString('base64')}`;
                    const uploaded = await cloudinary.uploader.upload(dataUrl,
                        {resource_type: 'auto'}
                    )
                    student.avatar = uploaded.url;
                    await student.save()
                }
                return res.status(200).json({
                    message: 'Student information updated successfully',
                    student: data
                });
            } else {
                return res.status(404).json({
                    message: 'Student not found'
                });
            }
        } catch (error) {
            return res.status(500).json({
                message: 'Error updating student',
                error: error.message
            });
        }
    },
    
    updateStudent: async (req, res) => {
        try {
            let newUser = req.body;
            let userId = req.params.studentID;
            let result = await StudentModel.findOneAndUpdate(
                { studentID: userId },
                newUser
            );
            if (!result) {
                return res.status(404).send({ message: "Không tìm thấy sinh viên" });
            }
            res.status(200).send(result);
        } catch (error) {
            res.status(500).send({ message: "Lỗi khi cập nhật sinh viên", error: error.message });
        }
    },

    deleteStudent: async (req,res) => {
        const studentID = req.params.studentID;
        let result = await StudentModel.findOneAndDelete(({studentID: studentID}));
        res.status(200).send(result);
    },

    register: async (req, res) => {
            const { email, password, studentName } = req.body;
            // Mã hóa mật khẩu
            const hashedPassword = bcrypt.hashSync(password, 10);

            // Tìm và tăng giá trị seq cho 'studentID'
            const counter = await Counter.findByIdAndUpdate(
                { _id: 'studentID' },
                { $inc: { seq: 1 } },
                { new: true, upsert: true }
            );

            // Định dạng studentID theo dạng #00001, #00002,...
            const formattedID = `A${String(counter.seq).padStart(5, '0')}`;

            // Tạo student mới với studentID tự động tăng
            const createStudent = await StudentModel.create({
                studentName,
                email,
                password: hashedPassword,
                studentID: formattedID // Gán studentID đã định dạng
            });

            res.status(201).send({
                message: 'Đăng ký thành công!',
                data: createStudent
            });
    }
};

export default studentController;
