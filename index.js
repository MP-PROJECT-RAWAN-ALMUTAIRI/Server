const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./")
require("dotenv").config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;
console.log(PORT);
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
}) 