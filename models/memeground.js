const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MemeSchema = new Schema({
    id: String,
    name: String,
    url: String,
    width: Number,
    height: Number,

});



module.exports = mongoose.model('Memeground', MemeSchema);