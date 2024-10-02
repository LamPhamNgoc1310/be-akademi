import express from 'express'
import studentController from '../controller/studentController.js';
import studentMiddleware from '../middleware/studentMiddleware.js';
import multer from 'multer';

const studentRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage
})

studentRouter.get('/', studentController.getListStudent)
studentRouter.post('/register', studentMiddleware.checkRegister, studentController.register)
studentRouter.put('/update-student', studentController.updateNewStudent);
studentRouter.put('/update-student-avatar', upload.single('avatar'), studentController.uploadAvatar);
studentRouter.put('/update-student/:studentID', studentController.updateStudent)
studentRouter.delete('/delete-student/:studentID', studentController.deleteStudent)

export default studentRouter;