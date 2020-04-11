const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { User } = require('./model/user');


const config = require('./config/key');

//get middleware auth
const { auth } = require('./middleware/auth');

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




app.get('/api/user/auth', auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role
    });
});

app.post('/api/users/register', (req, res) => {

    const user = new User(req.body);
    user.save((err, userData) => {
        if (err) return res.json({ sucess: false, err })
    })

    return res.status(200).json({ sucess: true });
});

app.post('/api/user/login', (req, res) => {
    //1º find the email
    User.findOne({ email: req.body.email }, (err, user) => {
        //if there is an error show error else get the user
        if (!user) return res.json({
            loginSucess: false,
            message: 'Auth fail, email not found'
        })
        //2º compare password
        user.comparePassword(req.body.password, (err, isMatch) => {
            //if not matched password
            if (!isMatch) {
                return res.json({ loginSucess: false, message: "Invalid password!" });
            }
        })
        //3º generate token
        user.generateToken((err, user) => {
            if (err) return res.status(400).send(err);
            res.cookie('x_auth', user.token)// If we have no errors we generate cookie named x_auth
                .status(200)
                .json({ loginSucess: true });
        })
    })
})

//request to this logs me out
app.get('/api/user/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user.id }, { token: '' }, (err, doc) => {
        if (err) return res.json({ sucess: false, err });
        return res.status(200).send({
            sucess: true
        })
    })
});



const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server running at port ${port} ...`);
});