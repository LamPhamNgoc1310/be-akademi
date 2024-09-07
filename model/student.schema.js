import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    avatar: String,
    studentName: String,
    studentID: { type: String, unique: true },
    dateOfBirth: String,
    grade: String,
    city: String,
    parentName: String,
    phone: String,
    address: String,
    role: {
        type: String,
        default: 'Student' 
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        unique: true,
        required: true,
    }
});

const StudentModel = mongoose.model('students', studentSchema);

export default StudentModel;
