exports.logger = (req, res, next) => {
    console.log(
        '=>',
        req.method,
        req.originalUrl,
        req.query
    );
    next();
}