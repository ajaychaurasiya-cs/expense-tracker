import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token format invalid" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id: userId }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid or expired" });
  }





  // ----------------------------------------------
//   const token = req.header("Authorization");
//   if (!token) return res.status(401).json({ error: "Access denied" });
//   console.log(token,"token");

//   try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = verified.id; console.log(verified);
//     next();
//   } catch {
//     res.status(400).json({ error: "Invalid token" });
//   }
}
