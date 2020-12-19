var mongoose = require('mongoose');
require('dotenv').config()
const mongoDB = process.env.MONGOURI

mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
.then(() => console.log("******************************" + "Mongodb Connected" + "******************************")
).catch(err => console.log("Error: " + err))

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));