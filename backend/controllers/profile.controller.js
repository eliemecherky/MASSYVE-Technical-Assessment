exports.current_user = (req, res) => {
  res.status(200).send({
    message: "Current data fetched!",
    data: req.user,
  });
};
