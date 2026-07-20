# Detailed Code Explanation: 3_notes_project

This document details the code logic in `3_notes_project/src/app.js` and `server.js`.

---

## 📄 File: `src/app.js`

### 1. Middleware & In-Memory Data Store
```javascript
const express = require("express");
const app = express();

app.use(express.json()); // middleware to parse JSON bodies
const notes = []; // array to store notes
```
* **Explanation**: 
  - `express.json()` middleware parses incoming JSON body data attached to HTTP `POST` or `PATCH` requests and makes it available under `req.body`.
  - `const notes = []` initializes an in-memory JavaScript array to store notes during runtime.

---

### 2. Create Note (`POST /notes`)
```javascript
app.post("/notes", (req, res) => {
  const note = req.body.note;

  if (!note) {
    return res.status(400).json({ message: "Note is required" });
  } else {
    notes.push(note);
    res.status(201).json({ message: "Note added successfully" });
  }
});
```
* **Explanation**:
  - Extracts `note` from `req.body`.
  - **Validation**: If `note` is missing or empty, returns HTTP `400 Bad Request`.
  - **Storage**: Appends `note` to array using `notes.push()`.
  - **Response**: Sends HTTP `201 Created` with a JSON success message.

---

### 3. Read Notes (`GET /notes`)
```javascript
app.get("/notes", (req, res) => {
  res.status(200).json({
    message: "Notes retrieved successfully",
    note: notes,
  });
});
```
* **Explanation**:
  - Responds with HTTP `200 OK` status and a JSON object containing the array of all existing notes.

---

### 4. Update Note (`PATCH /notes/:id`)
```javascript
app.patch("/notes/:id", (req, res) => {
  const id = req.params.id;
  const Newnote = req.body.note;

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
```
* **Explanation**:
  - Reads `id` from route parameters (`req.params.id`).
  - Reads `Newnote` from request body (`req.body.note`).
  - Returns `400` if `Newnote` is empty.
  - Returns `404 Not Found` if `notes[id]` does not exist.
  - Updates note at index `id` (`notes[id] = Newnote`) and returns `200 OK`.

---

### 5. Delete Note (`DELETE /notes/:id`)
```javascript
app.delete("/notes/:id", (req, res) => {
  const id = req.params.id;

  if (!notes[id]) {
    return res.status(404).json({ message: "Note not found" });
  } else {
    notes.splice(id, 1);
    return res.status(200).json({ message: "Note deleted successfully" });
  }
});
```
* **Explanation**:
  - Checks if a note exists at index `id`. If not, returns `404 Not Found`.
  - Removes 1 element at index `id` using JavaScript `notes.splice(id, 1)`.
  - Returns HTTP `200 OK` JSON response.

---

### 6. Module Export
```javascript
module.exports = app;
```
* **Explanation**: Exports `app` for use in `server.js`.

---

## 📄 File: `server.js`
```javascript
const app = require("./src/app");

app.listen(3000, () => {
    console.log("Server is running at port 3000");
});
```
* **Explanation**: Starts the server on port 3000 using the exported app configuration from `./src/app`.
