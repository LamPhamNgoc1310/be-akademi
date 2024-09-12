import express from 'express'
import markController from '../controller/markController.js';

const markRouter = express.Router();

markRouter.get('/', markController.getMark);
markRouter.post('/', markController.postMark);
markRouter.put('/update-mark/:studentID', markController.updateMark)

export default markRouter