const mongoose = require("mongoose");

const app = require("./app");

// const DB_HOST =
//   "mongodb+srv://Anastasiia:nastyaberest0603@cluster0.b5kcnua.mongodb.net/db-contacts?retryWrites=true&w=majority";

console.log(process.env);

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000");
// });
