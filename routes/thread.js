var express = require('express')
var router = express.Router()

const {ThreadModel} = require('../models')

router.get('/:id', async (req, res) => {
    const thread_id = req.params.id
    const thread = await ThreadModel.findOneAndUpdate({_id: thread_id}, { $inc: { thread_view : 1 }})
})

module.exports = router