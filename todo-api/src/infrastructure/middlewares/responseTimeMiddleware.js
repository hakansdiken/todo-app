export default function responseTimeMiddleware(req, res, next) {

    const startTime = Date.now();

    const originalWriteHead = res.writeHead;

    res.writeHead = function (...args) {

        const responseTime = Date.now() - startTime;

        res.setHeader("X-Response-Time", `${responseTime}ms`);

        console.log(responseTime + "ms")

        originalWriteHead.apply(res, args);
    };

    next();
}
