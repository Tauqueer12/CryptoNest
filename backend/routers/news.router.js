import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const apiKey = process.env.GNEWS_API_KEY;
    const response = await axios.get(`https://gnews.io/api/v4/search?q=crypto&apikey=${apiKey}`);

    res.status(200).json({
      success: true,
      data: response.data.articles,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
