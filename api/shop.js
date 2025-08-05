const { setData } = require("../data/" + process.env.set + ".json");
const { tftShopOddsByLevel } = require("../data/champs");

const tftChampions = setData.champions;
// console.log(process.env.set + ".json");
function getOddsByLevel(level) {
  const entry = tftShopOddsByLevel.find((x) => x.level === level);
  return entry ? entry.odds : null;
}

function weightedRandomPick(odds) {
  const roll = Math.random() * 100;
  let cumulative = 0;
  for (let cost = 1; cost <= 5; cost++) {
    cumulative += odds[cost];
    if (roll < cumulative) return cost;
  }
  return 5; // fallback
}

function championsByCost(cost) {
  return tftChampions.filter(
    (champ) => champ.cost === cost && champ.traits.length > 0
  );
}

function rerollShop(cost, level, count = 5) {
  const shop = [];
  let pool;
  for (let i = 0; i < count; i++) {
    if (cost) {
      pool = championsByCost(cost);
    } else {
      const odds = getOddsByLevel(level);
      if (!odds) return [];
      const getCostByLevel = weightedRandomPick(odds);
      pool = championsByCost(getCostByLevel);
    }
    // console.log(pool);
    const randomChamp = pool[Math.floor(Math.random() * pool.length)];
    shop.push({ champ: randomChamp });
  }
  return shop;
}

const shopRoll = (req, res) => {
  try {
    //   console.log("Đường dẫn tuyệt đối:", directoryPath);
    const count = Number(req.query?.count || 5);
    let level = Number(req.query?.level || 1);
    let cost = req.query?.cost;
    if (cost) cost = Number(cost);
    // console.log(level);
    if (level < 1) {
      level = 1;
    }
    if (level > 10) {
      level = 10;
    }

    const shop = rerollShop(cost, level, count);
    const champFromShops = shop.map((shopChamp) => {
      const champImage = shopChamp.champ.name?.replaceAll(" ", "_");
      return {
        ...shopChamp.champ,
      };
    });
    return res.json({
      champs: champFromShops,
      odds: getOddsByLevel(level),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Intenal Server Error" });
  }
};

module.exports = { shopRoll };
