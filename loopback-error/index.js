module.exports = function() {
    return function logError(err, req, res, next) {
        if (err) {
            console.error('middleware', req.url, err);
        }
        next();
    };
};
