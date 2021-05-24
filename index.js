const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Memeground = require('./models/memeground');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

mongoose.connect('mongodb://localhost:27017/stackOverMeme', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, 'connection error:'));
db.once("open", () => {
    console.log('database connected');
})

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(methodOverride('_method'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.get('/', (req, res) => {
    res.render('meme')
})

app.get('/template', async(req, res) => {
    const template = await Memeground.find({});
    res.render('template/index.ejs', { template })
})

app.get('/template/new', (req, res) => {
    res.render('template/new');
})
app.post('/template', async(req, res) => {
    const template = new Memeground(req.body.template)
    await template.save();
    res.redirect(`/template/${template._id}`)
})

app.get('/create/:id', async(req, res) => {
    const meme = await Memeground.findById(req.params.id);
    res.render('create/new', { meme })
})
app.post('/create', async(req, res) => {
    const newMeme = new Memeground({
        height: req.body.height,
        width: req.body.width,
        url: req.body.url,
    })
    await newMeme.save();
    let temp = newMeme._id;
    res.redirect(`/create/${temp}`)
})
app.delete('/template/:id', async(req, res) => {
    const { id } = req.params;
    await Memeground.findByIdAndDelete(id);
    res.redirect('/template');
})

app.get('/term', (req, res) => {
    res.render('term')
})

app.listen(3000, () => {
    console.log("Running on port 3000");
})