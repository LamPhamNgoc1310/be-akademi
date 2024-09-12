import express from 'express'
import notiController from '../controller/notiController.js';

const notiRouter = express.Router();

notiRouter.get('/', notiController.getNoti);
notiRouter.post('/', notiController.postNoti);

export default notiRouter