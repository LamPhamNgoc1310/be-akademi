import mongoose from "mongoose";

const markSchema = new mongoose.Schema({
    chinese: {
        type: Number,
        min: 0,
        max: 100
    },
    math: {
        type: Number,
        min: 0,
        max: 100
    },
    english: {
        type: Number,
        min: 0,
        max: 100
    },
    science: {
        type: Number,
        min: 0,
        max: 100
    },
    history: {
        type: Number,
        min: 0,
        max: 100
    },
    geography: {
        type: Number,
        min: 0,
        max: 100
    },
    studentID: String
})

const markModel = mongoose.model('marks', markSchema);

export default markModel;