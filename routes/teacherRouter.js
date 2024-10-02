import express from 'express'
import multer from 'multer';
import teacherMiddleware from '../middleware/teacherMiddleware.js';
import teacherController from '../controller/teacherController.js';

const teacherRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage
})
teacherRouter.get('/', teacherController.getTeacher);
teacherRouter.post('/register', teacherMiddleware.checkValidUser ,teacherController.register);
teacherRouter.put('/up-avatar',teacherMiddleware.verifyToken, upload.single('avatar'), teacherController.uploadAvatar);
teacherRouter.post('/login' ,teacherController.login);
teacherRouter.post('/forgot' ,teacherController.forgotPass);
teacherRouter.put('/update-teacher', teacherMiddleware.verifyToken, teacherController.updateUser)
teacherRouter.put('/change-password', teacherMiddleware.verifyToken, teacherController.changePassword)
teacherRouter.put('/reset-pass',teacherController.resetPass)


export default teacherRouter