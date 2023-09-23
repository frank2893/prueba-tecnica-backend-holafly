const loggingMiddleware = (db) => (req, res, next) => {
    const ip = req.headers['host'].split(':')[0].trim();
    const headers = JSON.stringify(req.headers);
    const originalUrl = req.originalUrl;

    db.logging.create({ip, header: headers, action: originalUrl})
    next();
}

module.exports = loggingMiddleware;