import mongoose from 'mongoose';

// Tạo Counter Schema
const counterSchema = new mongoose.Schema({
    _id: { type: String, required: true }, // Đặt id là 'studentID'
    seq: { type: Number, default: 0 } // Giá trị ban đầu của số thứ tự
});

const Counter = mongoose.model('Counter', counterSchema);

export default Counter;