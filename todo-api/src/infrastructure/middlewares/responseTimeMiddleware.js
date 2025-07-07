export default function responseTimeMiddleware(req, res, next) {

    const startTime = Date.now();

    res.on('finish', () => {

        const responseTime = Date.now() - startTime;
        console.log(`Response Time: ${responseTime}ms`);

    });

    next();
}
