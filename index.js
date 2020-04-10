const express = require('express');
const app = express();
const mongoose = require('mongoose')


mongoose.connect('mongodb+srv://admin:eclipse123solar123@cluster0-fl16v.mongodb.net/boilerplate?retryWrites=true&w=majority',
    {
        useNewUrlParser: true, useUnifiedTopology: true,
        useCreateIndex: true, useFindAndModify: false
    })
    .then(() => console.log('mongosb connected...'))
    .catch(err => console.log(`Error: ${err}`));


app.get('/', (req, res) => {
    res.send('hi world!!!!');
});

app.listen(5000);