// // Import necessary modules
// const client = require("../cacheClient/redis-client")

// // Middleware function to cache data
// const cacheMiddleware = async (req, res, next) => {
//   const user = await client.get(req._id);
//   console.log('inside of middleware',user); 
//   if (user) {
//     console.log("returning as found value in cache");
//     return res.status(200).json(JSON.parse(user));
//   }
//   else next()
// };

// // Export the middleware function
// module.exports = cacheMiddleware;


// Import necessary modules
const cacheClient = require("../cacheClient/redis-client"); // In-memory cache client

// Middleware function to cache data
const cacheMiddleware = async (req, res, next) => {
  // Get the user data from the in-memory cache
  const user = cacheClient.get(req._id);  // In-memory cache doesn't require `await`
  console.log('inside of middleware', user); 

  // If the user exists in the cache, return the cached data
  if (user) {
    console.log("returning as found value in cache");
    return res.status(200).json(JSON.parse(user));  // Parse and send cached data as response
  }
  
  // Otherwise, proceed to the next middleware
  next();
};

// Export the middleware function
module.exports = cacheMiddleware;
