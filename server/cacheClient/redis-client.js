// const redis = require('redis');

// const client = redis.createClient({
//     password: process.env.REDIS_PASSWORD,
//     socket: {
//         host: process.env.REDIS_URI,
//         port: process.env.REDIS_PORT
//     }
// });

// (async () => {
//     await client.connect();
// })();
// client.on('connect', () => {
//     console.log('Redis client connected');
// });

// client.on('error', (err) => {
//     console.error('Redis connection error:', err);
// });

// module.exports = client;



// Create an in-memory cache object
const cache = {};

// Cache utility functions
const cacheUtil = {
    set: (key, value) => {
        // Store the value in memory
        cache[key] = value;
    },
    get: (key) => {
        // Retrieve the value from memory
        return cache[key] || null; // Return `null` if the key doesn't exist
    },
    delete: (key) => {
        // Remove the key from the cache
        delete cache[key];
    },
    clear: () => {
        // Clear the entire cache
        Object.keys(cache).forEach((key) => delete cache[key]);
    }
};

// Log cache events
console.log('In-memory cache initialized');

module.exports = cacheUtil;
