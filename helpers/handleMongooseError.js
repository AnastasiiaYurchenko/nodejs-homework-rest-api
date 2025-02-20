const handleMongooseError = (error, data, next) => {
  // console.log(error);

  const { name, code } = error;
  // console.log(name);
  // console.log(code);

  const status = name === "MongoServerError" && code === 11000 ? 409 : 400;

  error.status = status;
  next();
};

module.exports = handleMongooseError;
