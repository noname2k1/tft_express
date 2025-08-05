const {
  setData: { traits },
} = require("../data/" + process.env.set + ".json");

const getTraits = (req, res) => {
  return res.json({
    traits,
  });
};

module.exports = { getTraits };
