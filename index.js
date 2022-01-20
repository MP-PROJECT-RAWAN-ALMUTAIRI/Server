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

const postRouter = require("./routers/routes/post");
app.use(postRouter);

const commentsRouter = require("./routers/routes/comment");
app.use(commentsRouter);

const rateRouter = require("./routers/routes/ratting");
app.use(rateRouter);

const disRouter = require("./routers/routes/discussion");
app.use(disRouter);

const questionRouter = require("./routers/routes/question");
app.use(questionRouter);

const PORT = process.env.PORT;
console.log(PORT);
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
