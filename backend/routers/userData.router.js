import express from "express";
import User from "../models/user.js";
import dotenv from "dotenv";
import auth from "../middleware/auth.middle.js";
const router = express.Router();
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

//Handling Get request
router.post("/portfolio", auth, async (req, res, next) => {
  try {
    const userId = req.user._id;
    const userData = await User.findById(userId);
    if (!userData) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      success: true,
      data: { stocks: userData.stocks, credits: userData.credits },
    });
  } catch (error) {
    next(error);
  }
});

// Add a Stock To User's Portfolio
router.post("/stock/add", auth, async (req, res, next) => {

  try {
    let userId = req.user._id;
    let { stockId, trade_amount, quantity } = req.body;
    if (!userId || !stockId) {
      const error = new Error("userId and stockId are required");
      error.statusCode = 400;
      throw error;
    }

    userId = String(userId).replace(/['"]+/g, "");
    console.log(userId);
    trade_amount = parseFloat(trade_amount);
    quantity = parseFloat(quantity);

    if (!Number.isFinite(trade_amount) || trade_amount < 10) {
      const error = new Error("trade_amount must be a number and at least 10");
      error.statusCode = 400;
      throw error;
    }
    if (!Number.isFinite(quantity) || quantity <= 0) {
      const error = new Error("quantity must be a positive number");
      error.statusCode = 400;
      throw error;
    }

    const debitedUser = await User.findOneAndUpdate(
      { _id: userId, credits: { $gte: trade_amount } },
      { $inc: { credits: -trade_amount } },
      { new: true }
    );

    if (!debitedUser) {
      const error = new Error("Insufficient Credits");
      error.statusCode = 400;
      throw error;
    }

    // Try incrementing an existing holding first.
    let updatedUser = await User.findOneAndUpdate(
      { _id: userId, "stocks.stockId": stockId },
      {
        $inc: {
          "stocks.$.quantity": quantity,
          "stocks.$.total_amount": trade_amount,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      // No existing holding — try adding a new one, but guard against
      // a concurrent request having just added it between these two calls.
      updatedUser = await User.findOneAndUpdate(
        { _id: userId, "stocks.stockId": { $ne: stockId } },
        { $push: { stocks: { stockId, quantity, total_amount: trade_amount } } },
        { new: true }
      );

      if (!updatedUser) {
        // Lost the race — a concurrent buy added it first. Fall back to increment.
        updatedUser = await User.findOneAndUpdate(
          { _id: userId, "stocks.stockId": stockId },
          {
            $inc: {
              "stocks.$.quantity": quantity,
              "stocks.$.total_amount": trade_amount,
            },
          },
          { new: true }
        );
      }
    }
    console.log(updatedUser);
    res.status(200).json({
      success: true,
      data: {
        stocks: updatedUser.stocks,
        credits: updatedUser.credits,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Remove a Stock From User's Portfolio
router.post("/stock/remove", auth, async (req, res, next) => {
  try {
    let userId = req.user._id;
    let { stockId, trade_amount, quantity } = req.body;
    if (!userId || !stockId) {
      const error = new Error("userId and stockId are required");
      error.statusCode = 400;
      throw error;
    }

    userId = String(userId).replace(/['"]+/g, "");
    trade_amount = parseFloat(trade_amount);
    quantity = parseFloat(quantity);
    console.log(userId);

    if (!Number.isFinite(trade_amount) || trade_amount < 10) {
      const error = new Error("trade_amount must be a number and at least 10");
      error.statusCode = 400;
      throw error;
    }
    if (!Number.isFinite(quantity) || quantity <= 0) {
      const error = new Error("quantity must be a positive number");
      error.statusCode = 400;
      throw error;
    }

    const user = await User.findOne({
      _id: userId,
      stocks: { $elemMatch: { stockId: stockId } },
    });

    if (user) {
      const stock = user.stocks.find((s) => s.stockId === stockId);
      const projectedQuantity = stock.quantity - quantity;
      const projectedTotal = stock.total_amount - trade_amount;
      console.log(projectedQuantity, projectedTotal);

      let updatedUser;
      if (projectedQuantity > 0 && projectedTotal > 5) {
        const result = await User.findOneAndUpdate(
          {
            _id: userId,
            stocks: { $elemMatch: { stockId, quantity: { $gte: quantity } } },
          },
          {
            $inc: {
              "stocks.$.quantity": -quantity,
              "stocks.$.total_amount": -trade_amount,
              credits: trade_amount,
            },
          },
          { new: true }
        );

        if (!result) {
          const error = new Error("Stock holding changed, please try again");
          error.statusCode = 409;
          throw error;
        }
        updatedUser = result;
      } else {
        const result = await User.findOneAndUpdate(
          {
            _id: userId,
            stocks: { $elemMatch: { stockId, quantity: { $gte: quantity } } },
          },
          {
            $inc: { credits: trade_amount },
            $pull: { stocks: { stockId } },
          },
          { new: true }
        );

        if (!result) {
          const error = new Error("Stock holding changed, please try again");
          error.statusCode = 409;
          throw error;
        }
        updatedUser = result;
      }

      console.log(updatedUser);

      res.status(200).json({
        success: true,
        data: {
          stocks: updatedUser.stocks,
          credits: updatedUser.credits,
          amount_left: projectedTotal,
        },
      });
      return;
    } else {
      const error = new Error("User or stock not found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
});


export default router;
