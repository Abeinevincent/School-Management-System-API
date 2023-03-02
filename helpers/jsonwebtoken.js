const jwt = require("jsonwebtoken");
// Generate jwt token
const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SEC, { expiresIn: "3d" });
  return token;
};

// verify token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) return res.status(403).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

// authorize account owner
const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("You are not alowed to do that!");
    }
  });
};

// authorize Teacher
const verifyTokenAndTeacher = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isTeacher || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("You are not alowed to do that!");
    }
  });
};

// authorize Student
const verifyTokenAndStudent = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isStudent || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("You are not alowed to do that!");
    }
  });
};

// authorize non teaching staff
const verifyTokenAndNonteachingstaff = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isNonteachingstaff || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("You are not alowed to do that!");
    }
  });
};

// authorize admin/headteacher
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json("You are not alowed to do that!");
    }
  });
};

module.exports = {
  generateToken,
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyTokenAndStudent,
  verifyTokenAndNonteachingstaff,
  verifyTokenAndTeacher,
};
