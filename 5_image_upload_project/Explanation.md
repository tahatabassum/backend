# Detailed Code Explanation: 5_image_upload_project

This document provides a line-by-line code explanation for the MongoDB and ImageKit.io file upload implementation in the `5_image_upload_project` folder.

---

## 🍃 1. Database Connection (`src/db/db.js`)

```javascript
const mongoose = require("mongoose");

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_LINK);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failure:", error.message);
    process.exit(1);
  }
};

module.exports = connectdb;
```
* **Explanation**:
  - Imports Mongoose ODM.
  - Declares an asynchronous function `connectdb` that executes `mongoose.connect()`, pulling the database link from `.env` (`process.env.MONGO_LINK`).
  - Logs connection status and shuts down the process on failure.
  - Exports the function to be used during server bootstrap.

---

## 🏗 2. Post Schema & Model (`src/models/post.models.js`)

```javascript
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  image: String, // Stores the cloud hosting image URL from ImageKit
  caption: String // Stores the user caption text
});

const postModel = mongoose.model("post", schema);
module.exports = postModel;
```
* **Explanation**:
  - Defines the data schema mapping fields `image` and `caption` to string database formats.
  - Compiles the schema into a Mongoose model named `postModel` (which maps to the collection named `posts` in MongoDB) and exports it.

---

## ☁️ 3. ImageKit Storage Service (`src/services/storage.service.js`)

```javascript
const { ImageKit } = require("@imagekit/nodejs");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});
```
* **Explanation**: Instantiates the official ImageKit.io SDK class using configurations retrieved securely from `.env`.

```javascript
async function uploadFile(buffer, originalname = "image.jpg") {
  console.log("Uploading file buffer:", buffer ? `${buffer.length} bytes` : "null");

  // Generate a unique filename using timestamp + clean original name
  const cleanName = originalname.replace(/[^a-zA-Z0-9.]/g, "_");
  const fileName = `${Date.now()}-${cleanName}`;

  const result = await imagekit.files.upload({
    file: buffer.toString("base64"), // Converts raw file buffer into base64 string format
    fileName: fileName, // Dynamic unique filename to prevent collisions
  });

  return result; // Returns object containing details (including result.url)
}

module.exports = uploadFile;
```
* **Explanation**:
  - `uploadFile` is an asynchronous service taking the binary file `buffer` and the `originalname`.
  - Generates a unique clean name by sanitizing special characters and appending `Date.now()`.
  - Converts binary buffer to a base64 string using `buffer.toString("base64")` (required by ImageKit SDK).
  - Triggers `imagekit.files.upload()` and returns the response metadata (including `url`).

---

## 🛣 4. Express Routes & Middleware Config (`src/app.js`)

```javascript
const express = require('express');
const multer = require('multer');
const uploadFile = require("./services/storage.service");
const postModel = require("./models/post.models");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() }); // Configures Multer to store uploaded files in temporary RAM buffer
```
* **Explanation**:
  - Imports router dependencies and configures Multer.
  - `multer.memoryStorage()` tells Multer to store raw binary files directly in memory (`req.file.buffer`) rather than writing them to temporary disk space.

### Route 1: Create Post (`POST /create-post`)
```javascript
app.post('/create-post', upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Image file is required" });
        }

        const result = await uploadFile(req.file.buffer, req.file.originalname);

        const post = await postModel.create({
            image: result.url, // Cloud hosting URL
            caption: req.body.caption
        });

        return res.status(201).json({
            message: "Post created successfully",
            post
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server Error during creation",
            error: error.message
        });
    }
});
```
* **Explanation**:
  - `upload.single("image")` parses form-data with field name `image` and binds details to `req.file`.
  - **Validation**: Rejects request with status `400` if file is missing.
  - Calls `uploadFile` with buffer and filename.
  - Stores the returned `result.url` and `req.body.caption` in MongoDB via `postModel.create()`.

### Route 2: Get All Posts (`GET /posts`)
```javascript
app.get("/posts", async (req, res) => {
    try {
        const posts = await postModel.find();
        return res.status(200).json({
            message: "Posts fetched successfully",
            posts
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server Error during fetch",
            error: error.message
        });
    }
});
```
* **Explanation**: Fetches all post metadata objects from the MongoDB collection and returns them with status `200`.

---

## ⚡ 5. Server Entry Point (`server.js`)

```javascript
const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]); // Forces public DNS to prevent database SRV connection errors

require("dotenv").config();
const connectdb = require("./src/db/db");
const app = require("./src/app");

connectdb(); // Connect database

app.listen(3000, () => {
    console.log("Server is running at port 3000");
});
```
* **Explanation**:
  - Configures the custom Google/Cloudflare DNS resolver at the very top.
  - Loads `.env` file variables.
  - Invokes `connectdb` to set up connection with database server.
  - Boots up the port listener.
