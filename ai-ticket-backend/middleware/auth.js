import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
      
    const authHeader = req.headers.authorization;

    
    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized: No Authorization header" });
    }
    
    // Check if the header format is correct (should be "Bearer token")
    if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Unauthorized: Invalid Authorization format" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token found" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to request object
        next();
    } catch (error) {
        console.error("Error during authentication:", error);
        return res.status(401).json({ message: "Unauthorized: " + error.message });
    }
};