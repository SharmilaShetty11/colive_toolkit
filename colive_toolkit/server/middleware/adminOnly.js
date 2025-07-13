import jwt from "jsonwebtoken";

const adminOnly = (req, res, next) => {
  console.log("Admin middleware triggered");
  const token = req.headers.authorization?.split(" ")[1];
  console.log("Token from headers:", token);
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  console.log("Token found, verifying...");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);
    if (!decoded || !decoded.id)
      return res.status(401).json({ message: "Unauthorized" });
    req.userId = decoded.id;
    console.log("User ID from token:", req.userId);
    // Check if user has admin role
    if (decoded.role !== "admin") {
      console.log("User is not an admin:", decoded.role);
      return res.status(403).json({ message: "Forbidden" });
    }
    if (!decoded || !decoded.role)
      return res.status(403).json({ message: "Forbidden" });
    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return res.status(403).json({ message: "Invalid token" });
  }
};

export default adminOnly;
