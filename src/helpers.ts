import { Item, Receipt, UnverifiedReceipt } from "./types.ts";
const POINTS = {
  alphanumRetailer: 1,
  AmountRoundNum: 50,
  AmountMultOf25: 25,
  per2Items: 5,
  purchaseDateOdd: 6,
  itemDescIsMultOf: 3,
  itemPriceMultiplier: 0.2,
  purchaseTimeStart: 14,
  purchaseTimeEnd: 16,
  purchaseTime24: 10,
};

export function validateReceipt(r: UnverifiedReceipt) {
  if (isNaN(+r.total)) {
    return null;
  }
  const items: Item[] = [];
  for (const item of r.items) {
    const price = +item.price;
    if (isNaN(price)) {
      return null;
    }
    items.push({ ...item, price });
  }
  return {
    retailer: r.retailer,
    purchaseDate: r.purchaseDate,
    purchaseTime: r.purchaseTime,
    total: +r.total,
    items: items,
  };
}
export function calculatePoints(receipt: Receipt) {
  let points = 0;

  // retailer alphanumeric length
  points += POINTS.alphanumRetailer *
    receipt.retailer.replace(/[^a-zA-Z0-9]/g, "").length;

  // total is a whole number
  if (Math.round(receipt.total) - receipt.total == 0) {
    points += POINTS.AmountRoundNum;
  }

  // total is multiple of 0.25
  if ((receipt.total * 100) % 25 == 0) {
    points += POINTS.AmountMultOf25;
  }

  // points for every 2 items
  points += Math.floor(receipt.items.length / 2) * POINTS.per2Items;

  // if trimmed item description length is a multiple of 3
  for (const item of receipt.items) {
    if (item.shortDescription.trim().length % POINTS.itemDescIsMultOf == 0) {
      points += Math.ceil(POINTS.itemPriceMultiplier * item.price);
    }
  }

  const purchaseDateTime = new Date(
    `${receipt.purchaseDate} ${receipt.purchaseTime}`,
  );

  // purchase date is odd number
  if (purchaseDateTime.getDate() % 2 == 1) {
    points += POINTS.purchaseDateOdd;
  }

  // purchase time between 14:00- 16:00
  if (
    purchaseDateTime.getHours() >= POINTS.purchaseTimeStart &&
    purchaseDateTime.getHours() < POINTS.purchaseTimeEnd
  ) {
    points += POINTS.purchaseTime24;
  }

  return points;
}
