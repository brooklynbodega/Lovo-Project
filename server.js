// require('dotenv').config()
// // Above is needed for env

// // Get the express module.
// const express = require('express');
// // Create a new Express application (web server)
// const app = express();

// // Set the port based on the environment variable (PORT=8080 node server.js)
// // and fallback to 4567
// const PORT = process.env.PORT || 4567;

// // Start the web server listening on the provided port.
// app.listen(PORT, () => {
//   console.log(`Express web server listening on port ${PORT}`);
// });

// ***********************************************************
const express = require('express');
const path = require('path');
// Create a new Express application (web server)
const app = express();

// Static hosting for built files
app.use("/", express.static("./build/"));

// Set the port based on the environment variable (PORT=8080 node server.js)
// and fallback to 4567
const PORT = process.env.PORT || 4567;

// Your routes go here.



// In production, any request that doesn't match a previous route
// should send the front-end application, which will handle the route.
if (process.env.NODE_ENV == "production") {
  app.get("/*", function (request, response) {
    response.sendFile(path.join(__dirname, "build", "index.html"));
  });
}

// Start the web server listening on the provided port.
app.listen(PORT, () => {
  console.log(`Express web server listening on port ${PORT}`);
});