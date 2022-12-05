const mongoose = require('mongoose');

const DB_URL = "mongodb+srv://root:3QDkUIC8gXmTglw9@cluster0.nrbdipq.mongodb.net/?retryWrites=true&w=majority";

const connect = () => {
    mongoose.connect(DB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

};

module.exports = connect;