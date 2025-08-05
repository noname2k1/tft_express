const { items, setData } = require("../data/" + process.env.set + ".json");

const getItems = (req, res) => {
  try {
    const itemNamesInCurrentSet = setData.items;
    const itemsInCurrentSet = itemNamesInCurrentSet.map((itemName) => {
      const itemFound = items.find((item) => item.apiName === itemName);
      return itemFound ? itemFound : null;
    });
    return res.json({ items: itemsInCurrentSet });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Intenal Server Error" });
  }
};

const useItem = (req, res) => {
  try {
    const { id, name, champUuid } = req.body;
    const item = items.find((item) => item.id === +id && item.name === name);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    if (!champUuid) {
      return res.status(400).json({ error: "Champ UUID is required" });
    }
    // console.log("use item", item, champUuid);
    return res.json({
      item,
      champUuid,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Intenal Server Error" });
  }
};

module.exports = { getItems, useItem };
