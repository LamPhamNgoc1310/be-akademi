import notiModel from "../model/notification.schema.js"

const notiController = {
    getNoti: async (req, res) => {
        const result = await notiModel.find();
        res.status(200).send(result)
    },

    postNoti: async (req, res) => {
        const newNoti = req.body;
        const result = await notiModel.create(newNoti);
        res.status(200).send(result)
    }
}

export default notiController;