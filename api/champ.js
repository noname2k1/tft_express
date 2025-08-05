const { setData } = require("../data/" + process.env.set + ".json");
const getLatestVersion = require("./version");
const getChamps = (req, res) => {
  return res.json({
    champs: setData.champions,
  });
};

module.exports = { getChamps };
