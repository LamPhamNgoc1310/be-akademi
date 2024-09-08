import express from 'express';
import mongoose from 'mongoose';
import studentRouter from './routes/studentRouter.js';
import cors from 'cors'
await mongoose.connect('mongodb+srv://minhduc180104:minhduc180104@learnmongo.zli6q.mongodb.net/student-management?retryWrites=true&w=majority&appName=LearnMongo')

const app = express();
app.use(express.json());
app.use(cors());

app.use('/students', studentRouter)

app.listen(8080, () => {
    console.log("Sever is running!")
})
