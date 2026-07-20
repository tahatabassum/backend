# 1. Creating Server (Express Starter)

Welcome to the **Creating Server** module! This project introduces the core fundamentals of creating a Web Server using Node.js and Express.

---

## 📌 Project Overview
This repository folder contains the initial hands-on exercise for initializing an Express application, defining basic HTTP GET routes, and listening on a designated port.

---

## 📁 Directory Structure
```
1_creating_server/
├── node_modules/         # Express & dependency packages
├── package.json          # Node project metadata & dependencies
├── package-lock.json     # Dependency tree lockfile
├── server.js             # Main application entry point
└── README.md             # Overview document
```

---

## ⚡ How to Run
1. Navigate to this directory:
   ```bash
   cd 1_creating_server
   ```
2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node server.js
   ```
4. Open your browser or API testing tool (Postman / Thunder Client) and visit:
   - `http://localhost:3000/` -> Returns `Hello, World!`
   - `http://localhost:3000/about` -> Returns `About Us`

---

## 🎯 Key Learnings
- Requiring `express` package in Node.js.
- Creating an Express server instance (`const app = express()`).
- Defining HTTP GET endpoints using `app.get(path, handler)`.
- Starting an HTTP server using `app.listen(port, callback)`.
