const express = require('express');
const multer = require('multer');
const uploadFile = require("./services/storage.service")
const postModel = require("./models/post.models") // Fixed model file name import
const cors = require("cors")

const app = express();
app.use(cors())
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() })

app.post('/create-post', upload.single("image"), async (req, res) => {
    try {
        // Validate if file was uploaded
        if (!req.file) {
            return res.status(400).json({
                message: "Image file is required"
            });
        }

        // Pass the file buffer and original name to generate a unique filename
        const result = await uploadFile(req.file.buffer, req.file.originalname);

        const post = await postModel.create({
            image: result.url,
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
})

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
})

module.exports = app;
