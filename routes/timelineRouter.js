import express from 'express'
import timelineController from '../controller/timelineController.js';

const timelineRouter = express.Router();

timelineRouter.get('/', timelineController.getTimeline);
timelineRouter.post('/', timelineController.postTimeline);

export default timelineRouter;