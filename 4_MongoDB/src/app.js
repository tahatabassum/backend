const express = require("express");
const mongoose = require("mongoose");
const Note = require("./models/Note");

const app = express();

app.use(express.json());

// POST /notes - Add a new note
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

// GET /notes - Get all notes
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

// PATCH /notes/:id - Update note by database ObjectId
app.patch("/notes/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const Newnote = req.body.note;

    if (!Newnote) {
      return res.status(400).json({ message: "A note is required" });
    }

    // Validate if the ID is a valid MongoDB ObjectId
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

// DELETE /notes/:id - Delete note by database ObjectId
app.delete("/notes/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // Validate if the ID is a valid MongoDB ObjectId
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

module.exports = app;
