# 2. REST API (Modular Architecture Starter)

Welcome to the **REST API** module! This project introduces modular application structuring by separating the server entry point (`server.js`) from the application routes and setup (`src/app.js`).

---

## 📌 Project Overview
In modular Node.js applications, decoupling server listener configuration from application setup allows for cleaner code organization, modular design, and easier testing.

---

## 📁 Directory Structure
```
2_Rest_api/
├── node_modules/         # Express & dependency packages
├── package.json          # Node project configuration
├── package-lock.json     # Dependency lockfile
├── server.js             # Server entry point (starts server listener)
├── src/
│   └── app.js            # Express app initialization & route definitions
├── README.md             # Overview document
└── Explanation.md        # Code explanation document
```

---

## ⚡ How to Run
1. Navigate to this directory:
   ```bash
   cd 2_Rest_api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the server:
   ```bash
   node server.js
   ```
4. Access endpoints:
   - `http://localhost:3000/` -> Returns `hlo world`
   - `http://localhost:3000/contact` -> Returns `Contact me bro`
   - `http://localhost:3000/about` -> Returns `About Us`

---

## 🎯 Key Learnings
- **Modular File Architecture**: Splitting application declaration (`app.js`) from server bootstrap (`server.js`).
- **Module Exporting & Importing**: `module.exports = app` and `require("./src/app")`.
- Basic REST API GET route handling across multiple pathways (`/`, `/contact`, `/about`).
