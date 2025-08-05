const tftShopOddsByLevel = [
  // Level 1 → 100% tướng 1 vàng
  { level: 1, odds: { 1: 100, 2: 0, 3: 0, 4: 0, 5: 0 } },
  { level: 2, odds: { 1: 100, 2: 0, 3: 0, 4: 0, 5: 0 } },
  { level: 3, odds: { 1: 75, 2: 25, 3: 0, 4: 0, 5: 0 } },
  { level: 4, odds: { 1: 55, 2: 30, 3: 15, 4: 0, 5: 0 } },
  { level: 5, odds: { 1: 45, 2: 33, 3: 20, 4: 2, 5: 0 } },
  { level: 6, odds: { 1: 30, 2: 40, 3: 25, 4: 5, 5: 0 } },
  { level: 7, odds: { 1: 19, 2: 30, 3: 40, 4: 10, 5: 1 } },
  { level: 8, odds: { 1: 18, 2: 25, 3: 32, 4: 22, 5: 3 } },
  { level: 9, odds: { 1: 10, 2: 20, 3: 25, 4: 35, 5: 10 } },
  { level: 10, odds: { 1: 5, 2: 10, 3: 20, 4: 40, 5: 25 } },
  { level: 11, odds: { 1: 1, 2: 2, 3: 12, 4: 50, 5: 35 } },
];

const sumChamps = [
  { 1: 22 },
  { 2: 20 },
  { 3: 17 },
  { 4: 10 },
  { 5: 9 },
  { 6: 9 },
];

module.exports = { tftShopOddsByLevel, sumChamps };
