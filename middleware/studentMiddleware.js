import StudentModel from "../model/student.schema.js";

const studentMiddleware = {
    checkRegister:  async (req, res, next) => {
        try {
            const { email, password, studentName } = req.body;
            if (!studentName) {
                throw new Error('StudentName is missing!');
            }
            if (!email) {
                throw new Error('Email is missing!');
            }
            if (!password) {
                throw new Error('Password is missing!');
            }
            const existingEmail = await StudentModel.findOne({ email });
            if (existingEmail) {
                throw new Error('Email already exists!');
            }
            next();
        } catch (error) {
            res.status(500).send({
                message: error.message,
                data: null
            });
        }
    },
}

export default studentMiddleware