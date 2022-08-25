const bcrypt = require('bcrypt');
const axios = require('axios');

const encrpytPassword = function(password, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        if (err != null) return callback(err);
    });

    bcrypt.hash(password, salt, function(err, hash) {
        return callback(err, hash);
    });
}


var passwordValid = function(password) {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return req.body.password.length > 0 && (password.match(/\d/g) || []).length > 0 || (password.match(specialChars) || []).length > 0 || (password.match(/[a-zA-Z]/g) || []).length > 0;
}


const changePassword = function(req, res) {
    if (!passwordValid(req.body.password)) {
        return res.status(404).send({"status": "failed", "message": "new password not valid"});
    }

    var encryptedPassword = encrpytPassword(req.body.password, function(err, hash=null) {
        if (err) res.status(404).send({"status": "failed", "message": `${err}`});
        return hash;
    });

    var changedUser;
    axios({
        method: 'get',
        url: '',
        data: {
            query: `
            `
        }
    }).then((user) => {
        changedUser = user;
    }).catch((err) => {
        return res.status(500).send({"status": "failed", "message": `${err}`});
    });

    axios({
        url: '',
        method: 'put',
        data: {
            query: `
                mutation {
                    updateUser(username: ${req.body.username}, newInfo: ${changedUser}) {
                        changedUser
                    }
                }
            `
        }
    }).then().catch(err => {
        return res.status(404).send({"status": "failed", "message": `${err}`});
    });

    return res.redirect("/login");
}

module.exports = changePassword;