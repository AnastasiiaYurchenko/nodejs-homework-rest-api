const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config(); //бере дані з текстового файлу .env і додає в process.env

const usersRouter = require("./routes/api/users"); //імпортуємо роутер
const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public")); //якщо прийде запит за файлом, бери його з папки public

app.use("/api/users", usersRouter); //будь-який запит на api/users  треба оброблювати цим роутом usersRouter
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server eror" } = err;
  res.status(status).json({ message });
});

module.exports = app;
