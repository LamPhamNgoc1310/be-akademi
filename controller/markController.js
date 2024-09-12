import markModel from "../model/mark.schema.js"

const markController = {
    getMark: async (req, res) => {
        const result = await markModel.find();
        res.status(200).send(result)
    },

    postMark: async (req, res) => {
        const newmark = req.body;
        const result = await markModel.create(newmark);
        res.status(200).send(result)
    },

    updateMark: async (req, res) => {
        const newmark = req.body;
        const student = req.params.studentID;
        const result = await markModel.findOneAndUpdate(
            {studentID: student},
            newmark,
        )
        res.status(200).send(result)
    }
}

export default markController;