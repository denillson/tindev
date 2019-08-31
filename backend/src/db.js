const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://omni:omniteste9090@cluster0-dvxdw.mongodb.net/tindev', {
    useNewUrlParser: true
})

module.exports = mongoose;