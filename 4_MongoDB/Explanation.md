# Detailed Code Explanation: 4_MongoDB Database Connected Backend

This document details the architecture, code logic, and step-by-step functionality of the MongoDB connected Notes backend implemented in the `4_MongoDB` directory.

---

## 🍃 1. Database Connection Config (`src/config/db.js`)

```javascript
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1); // Exits application with failure status code
  }
};

module.exports = connectDB;
```
* **Explanation**: 
  - Imports Mongoose ODM.
  - Declares an asynchronous function `connectDB` that runs `mongoose.connect()`, fetching the database URL from `.env` (`process.env.MONGO_URI`).
  - Logs a success message containing the host name when successfully connected.
  - Catches connection failures, prints the message, and terminates the Node.js process using `process.exit(1)`.

---

## 🏗 2. Mongoose Note Model (`src/models/Note.js`)

```javascript
const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    note: {
      type: String,
      required: [true, "Note content is required"],
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt fields
    versionKey: false, // Disables the default __v version field in documents
  }
);

module.exports = mongoose.model("Note", noteSchema, "note");
```
* **Explanation**:
  - Defines the database schema where each document must have a `note` string property.
  - The third parameter `"note"` in `mongoose.model()` explicitly points to the singular collection named `note` in the `notes_db` database, mapping to the collection shown in MongoDB Compass.

---

## 🛣 3. Express Application Routes (`src/app.js`)

```javascript
const express = require("express");
const mongoose = require("mongoose");
const Note = require("./models/Note");

const app = express();
app.use(express.json()); // Parses incoming request body as JSON
```

### Route 1: Create Note (`POST /notes`)
```javascript
app.post("/notes", async (req, res) => {
  try {
    const note = req.body.note;

    if (!note) {
      return res.status(400).json({ message: "Note is required" });
    }

    const newNote = new Note({ note });
    await newNote.save();

    res.status(201).json({ message: "Note added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});
```
* **Explanation**: Saves note to MongoDB. If validation passes, calls `newNote.save()` which inserts the document into the collection, returning `201 Created`.

### Route 2: Read Notes (`GET /notes`)
```javascript
app.get("/notes", async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json({
      message: "Notes retrieved successfully",
      note: notes,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});
```
* **Explanation**: Uses `Note.find()` to fetch all documents from the database, returning the list of objects.

### Route 3: Update Note (`PATCH /notes/:id`)
```javascript
app.patch("/notes/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const Newnote = req.body.note;

    if (!Newnote) {
      return res.status(400).json({ message: "A note is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Note not found" });
    }

    const updatedNote = await Note.findByIdAndUpdate(id, { note: Newnote }, { new: true });

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});
```
* **Explanation**:
  - Validates if the path `:id` is a 24-character hex string representing a valid MongoDB `ObjectId` using `mongoose.Types.ObjectId.isValid(id)`.
  - Performs `findByIdAndUpdate()` with the new value. If the ID is valid but doesn't exist, returns `404 Not Found`.

### Route 4: Delete Note (`DELETE /notes/:id`)
```javascript
app.delete("/notes/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Note not found" });
    }

    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});
```
* **Explanation**: Removes a note document from database by searching its unique `_id`.

---

## ⚡ 4. App Entry Point (`server.js`)

```javascript
require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/db");

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
```
* **Explanation**: Loads variables from `.env`, initializes the database connection, and starts the Express server.
