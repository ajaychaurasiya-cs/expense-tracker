import express from "express";
import Transaction from "../models/Transaction.js";
import auth from "../middleware/authMiddleware.js";
const router = express.Router();

// Add transaction
router.post("/", auth, async (req, res) => {
  try {
    const { title, amount, category } = req.body;

    const transaction = new Transaction({
      userId: req.user.id,   // ✅ VERY IMPORTANT
      title,
      amount,
      category,
    });

    await transaction.save();
    res.status(201).json(transaction);

  } catch (error) {
    console.error("Create Transaction Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// Get user transactions
router.get("/", auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({
      userId: req.user.id   // 👈 VERY IMPORTANT
    }).sort({ date: -1 });

    res.json(transactions);
  } catch (error) {
    console.error("Transaction Fetch Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// Delete transaction
router.delete("/:id", auth, async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "server error"})
  }
 
});
// Update transaction
router.put("/:id", auth, async (req, res) => {
  try {
    await Transaction.findByIdAndUpdate(req.params.id, req.body, {new: true});
  res.json({ message: "Update" });
  } catch (error) {
    console.error(error);
    res.status(500).json({message:"server error"})
  }
  
});

export default router;
