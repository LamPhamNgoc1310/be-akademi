import mongoose from "mongoose";

const timelineSchema = new mongoose.Schema({
    content: String,
    date: String,
    teacherID: String
})

const timelineModel = mongoose.model('timeline', timelineSchema);

export default timelineModel