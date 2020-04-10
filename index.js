const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { User } = require('./model/User');


const config = require('./config/key');


mongoose.connect(config.mongoURI,
    {
        useNewUrlParser: true, useUnifiedTopology: true,
        useCreateIndex: true, useFindAndModify: false
    })
    .then(() => console.log('mongodb connected...'))
    .catch(err => console.log(`Error: ${err}`));


app.use(cors())
//to get json data
// support parsing of application/json type post data
app.use(express.json());
app.use(cookieParser());


app.get('/', (req, res) => {
    res.send('hi worlfefefed!!!!');
});

app.post('/api/users/register', (req, res) => {

    const user = new User(req.body);
    user.save((err, userData) => {
        if (err) return res.json({ sucess: false, err })
    })

    return res.status(200).json({ sucess: true });
})

app.listen(5000, () => {
    console.log("server running...");
});