# Detailed Code Explanation: 1_creating_server

This file provides a step-by-step technical explanation of the code written in `1_creating_server/server.js`.

---

## 📄 File: `server.js`

```javascript
const express = require('express');
```
* **Explanation**: Imports the `express` module using Node.js CommonJS `require` syntax. Express is a web application framework for Node.js that simplifies routing, middleware integration, and HTTP server management.

```javascript
const app = express();
```
* **Explanation**: Instantiates the Express application. The `app` object contains methods for handling HTTP requests, configuring middleware, and launching the web server.

```javascript
// app.use(express.json());
```
* **Explanation**: Commented-out middleware. `express.json()` parses incoming HTTP requests with JSON payloads and populates `req.body`.

```javascript
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
```
* **Explanation**: Defines a route handler for `GET` requests sent to the root path (`/`). 
  - `req` (Request object): Represents the incoming HTTP request.
  - `res` (Response object): Represents the HTTP response being returned to the client.
  - `res.send(...)`: Sends a plain text HTTP response `"Hello, World!"`.

```javascript
app.get("/about", (req, res) => {
  res.send("About Us");
});
```
* **Explanation**: Defines a route handler for `GET` requests to `/about`, returning `"About Us"`.

```javascript
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```
* **Explanation**: Binds and listens for incoming connections on port `3000`. Once active, it triggers the callback function to log `"Server is running on port 3000"`.

---

## 🛠 Concepts Applied
1. **CommonJS Module Imports**: Using `require()` to bring external packages into scope.
2. **HTTP GET Method**: Handling retrieval requests from client applications.
3. **Event Loop & Listening**: Keeping the Node.js process alive to listen on TCP port 3000.
