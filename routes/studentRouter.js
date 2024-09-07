import express from 'express'
import studentController from '../controller/studentController.js';
import studentMiddleware from '../middleware/studentMiddleware.js';

const studentRouter = express.Router();

studentRouter.get('/', studentController.getListStudent)
studentRouter.post('/register', studentMiddleware.checkRegister, studentController.register)

export default studentRouter;