const express = require('express');
const router = express.Router();
const Memeground = require('../models/memeground');


router.get('/:id', async(req, res) => {
    const meme = await Memeground.findById(req.params.id);
    res.render('create/new', { meme })
})
router.post('/', async(req, res) => {
    const newMeme = new Memeground({
        height: req.body.height,
        width: req.body.width,
        url: req.body.url,
    })
    await newMeme.save();
    let temp = newMeme._id;
    res.redirect(`/create/${temp}`)
})

module.exports = router;