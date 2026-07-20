# 3. Notes Project (In-Memory CRUD REST API)

Welcome to the **Notes Project**! This project implements a full CRUD (Create, Read, Update, Delete) RESTful API for managing notes stored in memory.

---

## 📌 Project Overview
The Notes Project demonstrates fundamental REST API principles by supporting all major HTTP methods (`GET`, `POST`, `PATCH`, `DELETE`) with appropriate status codes (`200 OK`, `201 Created`, `400 Bad Request`, `404 Not Found`) and JSON responses.

---

## 📁 Directory Structure
```
3_notes_project/
├── node_modules/         # Express & dependency packages
├── package.json          # Node project configuration
├── package-lock.json     # Dependency lockfile
├── server.js             # Server entry point
├── src/
│   └── app.js            # Express routes & CRUD logic for notes
├── README.md             # Overview document
└── Explanation.md        # Detailed code breakdown
```

---

## 🚀 API Endpoints Overview

| Method | Endpoint | Description | Request Body / Params | Status Codes |
|---|---|---|---|---|
| `POST` | `/notes` | Add a new note | `{ "note": "Study MongoDB" }` | `201 Created`, `400 Bad Request` |
| `GET` | `/notes` | Retrieve all notes | None | `200 OK` |
| `PATCH` | `/notes/:id` | Update note by index | Route param `:id`, `{ "note": "Updated Text" }` | `200 OK`, `400 Bad Request`, `404 Not Found` |
| `DELETE` | `/notes/:id` | Delete note by index | Route param `:id` | `200 OK`, `404 Not Found` |

---

## ⚡ How to Run
1. Navigate to this directory:
   ```bash
   cd 3_notes_project
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the server:
   ```bash
   node server.js
   ```
4. Test API using Postman, Thunder Client, or cURL.

---

## 🎯 Key Learnings
- Body parsing using `express.json()` middleware.
- Dynamic route parameters (`req.params.id`).
- Implementation of HTTP Methods: `GET`, `POST`, `PATCH`, and `DELETE`.
- Proper HTTP response status handling (`200`, `201`, `400`, `404`).
- Working with in-memory data structures (JS arrays).
