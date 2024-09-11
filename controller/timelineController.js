import timelineModel from "../model/timeline.schema.js"

const timelineController = {
    getTimeline: async (req, res) => {
        const result = await timelineModel.find();
        res.status(200).send(result);
    },

    postTimeline: async (req, res) => {
        const newTimeline = req.body;
        const result = await timelineModel.create(newTimeline);
        res.status(200).send(result);
    }
}

export default timelineController;