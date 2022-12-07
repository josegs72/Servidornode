const mongoose = require('mongoose');

const DB_URL = "mongodb+srv://root:1Lor8wFgXCUbCJlF@cluster0.1vr8feq.mongodb.net/?retryWrites=true&w=majority";

const connect = () => {
    mongoose.connect(DB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

};

module.exports = connect;