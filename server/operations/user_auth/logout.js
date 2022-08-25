

const logout = function(req, res) {
    req.session.destroy();
    res.redirect("/login");
}

module.exports = logout;