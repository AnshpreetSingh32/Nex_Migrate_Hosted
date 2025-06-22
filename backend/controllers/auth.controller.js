const db = require('../models');
const Admin = db.Admin;
const User = db.User;
const jwt = require('jsonwebtoken');


exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ where: { email, password } });

  if (!admin) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate JWT token with role
  const token = jwt.sign(
    { adminId: admin.adminId, email: admin.email, role: 'admin' }, // <-- role added
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '1h' }
  );

  return res.json({ message: "Login successful", token, admin });
};

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email, password } });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate JWT token with role
  const token = jwt.sign(
    { userId: user.id, email: user.email, role: 'user' }, // <-- role added
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '1h' }
  );

  return res.json({ message: "Login successful", token, user });
};