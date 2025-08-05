// fetch_set15.js
require("dotenv").config();
const fs = require("fs");
const https = require("https");
const path = require("path");

module.exports = () => {
  const outputPath = path.join(__dirname, process.env.set + ".json");

  if (fs.existsSync(outputPath)) {
    // console.log('✅ File "set15.json" đã tồn tại, không cần fetch lại.');
  } else {
    const url = `https://raw.communitydragon.org/${process.env.version}/cdragon/tft/en_us.json`;
    https
      .get(url, (res) => {
        let rawData = "";

        res.on("data", (chunk) => {
          rawData += chunk;
        });

        res.on("end", () => {
          try {
            const json = JSON.parse(rawData);
            const setData = json.setData.find(
              (s) => s.name === process.env.set
            );
            const items = json.items;
            if (!setData) {
              console.error(
                `❌ Không tìm thấy ${process.env.set} trong dữ liệu.`
              );
              return;
            }

            fs.writeFileSync(
              outputPath,
              JSON.stringify({ setData, items }, null, 2),
              "utf-8"
            );
            console.log(
              '✅ Đã ghi file "' + process.env.set + ".json" + '" thành công!'
            );
          } catch (e) {
            console.error("❌ Lỗi xử lý JSON:", e.message);
          }
        });
      })
      .on("error", (err) => {
        console.error("❌ Lỗi fetch:", err.message);
      });
  }
};
