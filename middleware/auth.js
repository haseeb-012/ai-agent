import jwt from 'jsonwebtoken';


export const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

  try {
     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request object
    next();
     next();
  } catch (error) {
      console.error("Error during authentication:", error);
      return res.status(500).json({ message: "Internal server error" });
    
  }
};