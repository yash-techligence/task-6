const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: "Access Denied"
    });
  }

  const token = authHeader.split(' ')[1]; // ← strip "Bearer " prefix

  try {

    const verified = jwt.verify(token, "secretkey");
    req.user = verified;
    next();

  } catch (error) {

    res.status(400).json({
      message: "Invalid Token"
    });

  }

};

module.exports = verifyToken;