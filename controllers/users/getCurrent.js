const getCurrent = async (req, res, next) => {
  try {
    //   console.log(req.user);

    const { email, subscription } = req.user;

    res.status(200).json({ email, subscription });
  } catch (error) {
    next(error);
  }
};

module.exports = getCurrent;
