const Trade = require('../models/Trade');
const { broadcast } = require('../utils/websocket');
const redisClient = require('../utils/redisClient');

exports.getAllTrades = async (req, res) => {
  try {
    redisClient.get('allTrades', async (err, trades) => {
      if (trades) {
        return res.status(200).send(JSON.parse(trades));
      } else {
        const trades = await Trade.find({});
        redisClient.setex('allTrades', 3600, JSON.stringify(trades));
        res.status(200).send(trades);
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
