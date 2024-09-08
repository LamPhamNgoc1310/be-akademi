import express from 'express'
import studentController from '../controller/studentController.js';
import studentMiddleware from '../middleware/studentMiddleware.js';

const studentRouter = express.Router();

studentRouter.get('/', studentController.getListStudent)
studentRouter.post('/register', studentMiddleware.checkRegister, studentController.register)
studentRouter.put('/update-student', studentController.updateNewStudent)
studentRouter.delete('/delete-student/:studentID', studentController.deleteStudent)

export default studentRouter;