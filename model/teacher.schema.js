import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    teacherName: String,
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        unique: true,
        required: true,
    },
    role: {
        type: String,
        default: 'Teacher'
    }, 
    avatar: String,
    dateOfBirth: String,
    subject: String,
    phoneNumber: String,
    address: String
})

const teacherModel = mongoose.model('teachers', teacherSchema);

export default teacherModel