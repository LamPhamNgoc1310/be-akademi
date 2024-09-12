import mongoose from "mongoose";

const notiSchema = new mongoose.Schema({
    grade: String,
    content: String,
    teacherID: String,
    date: String,
    isMonth: {
        type: Boolean,
        default: false, 
    },
})

const notiModel = mongoose.model('notifications', notiSchema);

export default notiModel;