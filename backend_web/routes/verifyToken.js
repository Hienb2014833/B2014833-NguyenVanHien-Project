const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) {
        
        if (err.name === 'TokenExpiredError') {
          res.status(401).json("Mã thông báo đã hết hạn!");
        } else if (err.name === 'JsonWebTokenError') {
          res.status(401).json("Mã thông báo không hợp lệ!");
        } else {
          res.status(401).json("Lỗi xác minh token!");
        }
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    console.log("Token not provided");
    return res.status(401).json("Bạn không được xác thực!");
  }
};


const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("Bạn không có quyền để làm điều đó!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("Bạn không có quyền để làm điều đó!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};