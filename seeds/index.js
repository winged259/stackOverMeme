const { default: axios } = require('axios');
const mongoose = require('mongoose');
const Memeground = require('../models/memeground');
const Mememade = require('../models/mememade');

mongoose.connect('mongodb://localhost:27017/stackOverMeme', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, 'connection error:'));
db.once("open", () => {
    console.log('database connected');
});

const seedDB = async() => {
    await Memeground.deleteMany({});
    const memeResult = await axios.get('https://api.imgflip.com/get_memes');
    const memes = memeResult.data.data.memes;
    for (let meme of memes) {
        const me = new Memeground({
            name: meme.name,
            url: meme.url,
            width: meme.width,
            height: meme.height,
        })
        await me.save()
    }
}

seedDB();