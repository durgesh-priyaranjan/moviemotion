module.exports = function(req, res, next) {
    if (req.user && req.user.admin) {
        return next();
    } else {
        return res.send(403, {
            message: 'Not Authorized'
        });
    }
};