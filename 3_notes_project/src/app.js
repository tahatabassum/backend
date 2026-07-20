const express = require("express");
const app = express(); // server instance create kr rhe hai or server ko bna rha ha

//post request
app.use(express.json()); // middleware to parse JSON bodies

const notes = []; // array to store notes

app.post("/notes", (req, res) => {
  const note = req.body.note;

  if (!note) {
    // if note is not provided in the request body, return a 400 Bad Request response
    return res.status(400).json({ message: "Note is required" });
  } // if note is provided, add it to the notes array and return a 201 Created response
  else notes.push(note);
  res.status(201).json({ message: "Note added successfully" });
});

// get request
app.get("/notes", (req, res) => {
  res.status(200).json({
    message: "Notes retrieved successfully",
    note: notes,
  });
});

// Patch request (update request)

app.patch("/notes/:id", (req, res) => {
  const id = req.params.id; // get the id from the request parameters
  const Newnote = req.body.note; // get the updated note from the request body

  if (!Newnote) {
    return res.status(400).json({ message: "A note is required" });
  }
  if (!notes[id]) {
    return res.status(404).json({ message: "Note not found" });
  } else {
    notes[id] = Newnote;
    return res.status(200).json({ message: "Note updated successfully" });
  }
});

// delete request
app.delete("/notes/:id", (req, res) => {
  const id = req.params.id; // get the id from the request parameters

  if (!notes[id]) {
    return res.status(404).json({ message: "Note not found" });
  } else {
    notes.splice(id, 1);
    return res.status(200).json({ message: "Note deleted successfully" });
  }
});






module.exports = app;
