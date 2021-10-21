const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./config/db");

const authRouts = require("./routes/auth");
const userRouts = require("./routes/users");
const movieRouts = require("./routes/movies");
const listRouts = require("./routes/lists");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

db();

//put  cors it upper. 

app.use("/api/auth", authRouts);  
app.use("/api/users", userRouts); // user api end points
app.use("/api/movies", movieRouts); // Movies api end points
app.use("/api/lists", listRouts); // Movies api end points


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on 5000`));