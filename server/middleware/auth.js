const { User } = require('../model/user');

let auth = (req, res, next) => {
    //1º We need the token, to check if we are authenticated
    let token = req.cookies.x_auth;

    User.findByToken(token, function (err, user) {
        if (err) throw err;
        if (!user) return res.json({
            isAuth: false,
            error: true
        });

        //if we find a user, we put token and user in user and token
        req.token = token;
        req.user = user;
        next();
    })
}

module.exports = { auth }