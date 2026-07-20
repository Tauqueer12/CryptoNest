import express from "express";
import User from "../models/user.js";
import dotenv from "dotenv";
import auth from "../middleware/auth.middle.js";
const router = express.Router();
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

//Handling Get request
router.get("/portfolio", auth, async (req, res, next) => {
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

    // Floating-point-safe "effectively zero" threshold — far below any real
    // currency's smallest unit (e.g. Bitcoin's smallest unit is 1e-8), so a
    // genuine small holding is never mistaken for computational noise.
    const FLOATING_POINT_EPSILON = 1e-12;

    const result = await User.findOneAndUpdate(
      {
        _id: userId,
        stocks: { $elemMatch: { stockId, quantity: { $gte: quantity } } },
      },
      [
        {
          $set: {
            credits: { $add: ["$credits", trade_amount] },
            stocks: {
              $map: {
                input: "$stocks",
                as: "s",
                in: {
                  $cond: [
                    { $eq: ["$$s.stockId", stockId] },
                    {
                      stockId: "$$s.stockId",
                      quantity: { $subtract: ["$$s.quantity", quantity] },
                      total_amount: {
                        $subtract: ["$$s.total_amount", trade_amount],
                      },
                    },
                    "$$s",
                  ],
                },
              },
            },
          },
        },
        {
          $set: {
            stocks: {
              $filter: {
                input: "$stocks",
                as: "s",
                cond: {
                  $gte: [{ $abs: "$$s.quantity" }, FLOATING_POINT_EPSILON],
                },
              },
            },
          },
        },
      ],
      { new: true }
    );

    if (!result) {
      const error = new Error("Stock holding changed, please try again");
      error.statusCode = 409;
      throw error;
    }

    const updatedStock = result.stocks.find((s) => s.stockId === stockId);

    res.status(200).json({
      success: true,
      data: {
        stocks: result.stocks,
        credits: result.credits,
        amount_left: updatedStock ? updatedStock.total_amount : 0,
      },
    });
  } catch (error) {
    next(error);
  }
});


export default router;
