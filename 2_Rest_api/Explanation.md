# Detailed Code Explanation: 2_Rest_api

This document explains the code implementation across `server.js` and `src/app.js` in the `2_Rest_api` directory.

---

## 📄 File 1: `src/app.js`

```javascript
const express = require('express');
const app = express();
```
* **Explanation**: Imports Express framework and creates the primary Express application object `app`.

```javascript
// Get request
app.get("/", (req, res) => {
    res.send("hlo world");
});

app.get("/contact", (req, res) => {
    res.send("Contact me bro");
});

app.get("/about", (req, res) => {
    res.send("About Us");
});
```
* **Explanation**: Sets up three separate GET endpoints:
  1. `/`: Sends response `"hlo world"`.
  2. `/contact`: Sends response `"Contact me bro"`.
  3. `/about`: Sends response `"About Us"`.

```javascript
module.exports = app;
```
* **Explanation**: Exports the `app` object using CommonJS `module.exports`, making it available to be imported in `server.js` or test scripts.

---

## 📄 File 2: `server.js`

```javascript
const app = require("./src/app");
```
* **Explanation**: Imports the configured Express application instance from `./src/app.js`.

```javascript
app.listen(3000, () => {
    console.log(" Our server is running at port 3000");
});
```
* **Explanation**: Launches the HTTP server on TCP port `3000` and outputs a confirmation log once active.

---

## 💡 Architecture Benefits
- **Separation of Concerns**: `app.js` is responsible solely for routing & middleware setup, while `server.js` manages networking/server startup.
- **Testability**: Supertest or other API test runners can import `app` directly without starting a live HTTP server binding on a port.
