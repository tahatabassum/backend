const express = require('express');

const app = express() // server instance create kr rhe hai or server ko bna rha ha 
//app.use(express.json());   middleware function jo request body ko json format me convert krta ha
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/about", (req, res) => {
  res.send("About Us");
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");     // used for starting server and listening to the port
}); 