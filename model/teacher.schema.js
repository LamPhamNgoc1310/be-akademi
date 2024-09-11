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
    dateOfBirth: String,
    grades: {type: [String]},
    phoneNumber: String,
    address: String

})

const teacherModel = mongoose.model('teachers', teacherSchema);

export default teacherModel