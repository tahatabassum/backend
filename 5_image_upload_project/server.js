const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]); // Forces public DNS to prevent database SRV connection errors

require("dotenv").config(); // Loads environment variables
const connectdb = require("./src/db/db"); // Imports DB connection
const app = require("./src/app"); // app.js ko import kr rhe hai taki uske routes use kr ske

// Connect to MongoDB Database
connectdb();

app.listen(3000, () => {
    console.log("Server is running at port 3000");
});