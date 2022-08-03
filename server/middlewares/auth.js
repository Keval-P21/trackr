const admin = require('../firebase-config/firebase-config');

const authMiddleware = async (req, res, next) => {
  const authHeaders = req.headers['authorization'];
  if (!authHeaders) return res.sendStatus(403);
  const token = authHeaders.split(' ')[1];

  try {
    const decodeToken = await admin.auth().verifyIdToken(token);
    if (decodeToken) return next();
    return res.sendStatus(401);
  } catch (error) {
    console.log(error);
    res.sendStatus(401);
  }
};

module.exports = authMiddleware;
