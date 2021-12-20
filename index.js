const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db/db"); 
require("dotenv").config();

app.use(cors());
app.use(express.json());

const usersRouter = require("./routers/routes/user");
app.use(usersRouter); 

const rolesRouter = require("./routers/routes/role"); 
app.use(rolesRouter);

const PORT = process.env.PORT;
console.log(PORT);
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
}) 