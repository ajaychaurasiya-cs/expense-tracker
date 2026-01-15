import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email, !password) {
      return res
        .status(400)
        .json({ error: "please enter vailid email & password" });
    } else {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ error: "User not found" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ error: "Invalid credentials" });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.json({ token, user });
    }
  } catch (error) {
    res.status(400).json({ error: "vailid email & password enter" });
    console.log("vailid email. and passsword");
  }
});

router.get("/getuser", authMiddleware, async (req, res) => {
  const id = req.user.id;
  try {
    const user = await User.find({ _id: id });
    res.status(200).json({ user: user[0] });
  } catch (error) {
    res.status(502).json(error);
  }
});
export default router;
