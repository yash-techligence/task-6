const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Access Denied",
    });
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  try {
    const verified = jwt.verify(token, "secretkey");
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({
      message: "Invalid Token",
    });
  }
};

module.exports = verifyToken;