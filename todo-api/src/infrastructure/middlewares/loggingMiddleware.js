export default function loggingMiddleware(req, res, next) {

    const now = new Date();

    console.log(`[${now}] ${req.method} ${req.url}`);
    next();
}