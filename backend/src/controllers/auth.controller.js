exports.register = (req, res) => {
  res.status(201).json({ message: "User registered successfully" });
};

exports.login = (req, res) => {
  res.status(200).json({ token: "fake-jwt-token" });
};
