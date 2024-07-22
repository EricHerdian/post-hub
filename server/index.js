const express = require("express");
const cors = require("cors");
const db = require("./models");

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

// Routers
const blogsRouter = require("./routes/Blogs");
app.use("/api/blogs", blogsRouter);

const usersRouter = require("./routes/Users");
app.use("/api/users", usersRouter);

const authRouter = require("./routes/Auth");
app.use("/api/auth", authRouter);

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
