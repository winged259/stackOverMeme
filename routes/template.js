const express = require('express');
const router = express.Router();
const Memeground = require('../models/memeground');


router.get('/', async(req, res) => {
    const template = await Memeground.find({});
    res.render('template/index.ejs', { template })
})

router.get('/new', (req, res) => {
    res.render('template/new');
})
router.post('/', async(req, res) => {
    const template = new Memeground(req.body.template)
    await template.save();
    res.redirect(`/template/${template._id}`)
})
router.delete('/:id', async(req, res) => {
    const { id } = req.params;
    await Memeground.findByIdAndDelete(id);
    res.redirect('/template');
})

module.exports = router;