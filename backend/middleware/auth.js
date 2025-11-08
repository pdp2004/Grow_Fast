import jwt from 'jsonwebtoken';

export const authorize = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.replace('Bearer ', '') : null;

    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

    req.userId = decoded.userId; // attach userId to request
    next();
  } catch (error) {
    console.error('Authorization error:', error);
    res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};
