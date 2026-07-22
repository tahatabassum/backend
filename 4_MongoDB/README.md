# 4. MongoDB Connected Notes Project

Welcome to the **MongoDB Connected Notes Project**! This project replaces the previous in-memory CRUD backend (`3_notes_project`) with a persistent database backend using MongoDB Atlas (cloud database) and Mongoose ODM.

---

## 📌 Project Overview
This module demonstrates how to connect a Node/Express backend to MongoDB Atlas and perform CRUD operations on a persistent collection.

- **Create**: Add a note string to the `note` collection using Mongoose Schema validation.
- **Read**: Retrieve all note documents from MongoDB.
- **Update**: Update any note document using its unique database `_id` parameter.
- **Delete**: Remove a note document from the collection using its unique database `_id` parameter.

---

## 📁 Directory Structure
```
4_MongoDB/
├── src/
│   ├── config/
│   │   └── db.js         # Mongoose connection configuration
│   ├── models/
│   │   └── Note.js       # Note Schema & Model definition
│   └── app.js            # Express routing & CRUD endpoints
├── .env                  # Port & MongoDB URI (Excluded from git)
├── package.json          # Node project configuration
├── package-lock.json     # Dependency tree lockfile
├── server.js             # Entry point (boots server & connects DB)
├── README.md             # Project overview & running instructions
└── Explanation.md        # Detailed code walkthrough
```

---

## ⚡ How to Run

1. Navigate to this directory:
   ```bash
   cd 4_MongoDB
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure your Environment Variables:
   Create a `.env` file in the root of the `4_MongoDB` directory and add your MongoDB connection string (make sure it ends with `/notes_db`):
   ```env
   PORT=3000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster1.fpuvagz.mongodb.net/notes_db?retryWrites=true&w=majority
   ```

4. Start the server:
   ```bash
   node server.js
   ```

---

## 🚀 API Endpoints

| Method | Endpoint | Description | Request Body |
|---|---|---|---|
| `POST` | `/notes` | Create a new Note | `{ "note": "Walk the dog" }` |
| `GET` | `/notes` | Retrieve all Notes | None |
| `PATCH` | `/notes/:id` | Update Note by its database `_id` | `{ "note": "Walk the dog tomorrow" }` |
| `DELETE` | `/notes/:id` | Delete Note by its database `_id` | None |
