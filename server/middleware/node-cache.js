const cache = require("../cacheClient/node-cache-client")
const cacheMiddleware = async (req, res, next) => {
    const user = await cache.get(req._id);
    console.log('inside of middleware', user);
    if (user) {
        console.log("returning as found value in cache");
        return res.status(200).json(JSON.parse(user));
    }
    else next()
};

module.exports = cacheMiddleware;