const {axios} = require("axios");
const bcrypt = require('bcrypt');

let hashPassword = (password, callback) => {
    bcrypt.genSalt(10, function(err, salt) {
        if (err != null) return callback(err);
    });

    bcrypt.hash(password, salt, function(err, hash) {
        return callback(err, hash);
    });
}

let checkPasswords = (storedPassword, typedPassword, callback) => {
    bcrypt.compare(storedPassword, typedPassword, function(err, matches) {
        if (!err) {
            return callback(null, matches);
        }
        return callback(err);
    });
}

const login = function(req, res) {
    if (!req.body.username || !req.body.password) {
        return res.status(500).send({"status": "failed", "message": "username or password not valid"});
    }

    axios({
        method: 'get',
        url: '',
        data: {
            query: `
            `
        }
    }).then((result) => {
        hashPassword(givenPassword, function(error, hash=null) {
            if (err) {
                return res.status(404).send({"status": "failed", "message": "user not found"});
            }
            return hash;
        });
    })
    .catch((err) => {
        return res.status(500).send({"status": "failed", "message": `${err}`});
    });

    var matches = checkPasswords(req.body.password, givenPassword, function(err, matched=false) {
        if (err) {
            return res.status(404).send({"status": "failed", "message": `${err}`});
        }
        return matched;
    });

    if (!matches) {
        return res.status(404).send({"status": "failed", "message": "Passwords don't match"});
    }
    else {
        req.session.username = res.body.username;
        res.session.loggedIn = true;
        return res.redirect("/feed");
    }
}

module.exports = login;