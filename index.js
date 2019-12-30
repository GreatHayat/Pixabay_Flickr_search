const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');
const users = require("./routes/users");
const auth = require("./routes/auth");
const search = require("./routes/search");
const history = require('./routes/history');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/search", search);
app.use("/api/history", history);

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/pixabay_search")
  .then(() => console.log("Connected to MongoDB"))
  .catch(error => console.log("Couldn't connected to MongoDB", error));

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('frontend_app/build'));
  app.get("*", (req, res)=>{
    res.sendFile(path.resolve(__dirname, "frontend_app", "build", "index.html"))
  })
}
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`App is listining on port ${port}`));
