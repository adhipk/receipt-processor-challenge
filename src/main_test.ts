
import { calculatePoints, validateReceipt } from "./helpers.ts";
import { assertEquals } from "jsr:@std/assert";


Deno.test("points calculation - retailer name alphanumeric length", () => {
  const receipt = validateReceipt({
    "retailer": "Store$$123",
    "purchaseDate": "2022-03-12",
    "purchaseTime": "12:30",
    "total": "8.24",
    "items": []
  });
  if (receipt) {
    const points = calculatePoints(receipt);
    assertEquals(points, 8);
  }
});

Deno.test("points calculation - total is a round number and multiple of 0.25", () => {
  const receipt = validateReceipt({
    "retailer": "",
    "purchaseDate": "2022-04-22",
    "purchaseTime": "10:05",
    "total": "4.00",
    "items": [
      {"shortDescription": "Gallon Milk", "price": "4.00"}
    ]
  });
  if (receipt) {
    const points = calculatePoints(receipt);
    assertEquals(points, 75);
  }
});

Deno.test("points calculation - total is a multiple of 0.25", () => {
  const receipt = validateReceipt({
    "retailer": "",
    "purchaseDate": "2022-04-22",
    "purchaseTime": "10:05",
    "total": "1.25",
    "items": [
      {"shortDescription": "Gallon Milk", "price": "1.25"}
    ]
  });
  if (receipt) {
    const points = calculatePoints(receipt);
    assertEquals(points, 25);
  }
});

Deno.test("points calculation - 5 points for every 2 items", () => {
  const receipt = validateReceipt({
    "retailer": "",
    "purchaseDate": "2022-04-22",
    "purchaseTime": "10:05",
    "total": "20.40",
    "items": [
      {"shortDescription": "eggs", "price": "10.20"},
      {"shortDescription": "milk", "price": "10.20"}
    ]
  });
  if (receipt) {
    const points = calculatePoints(receipt);
    assertEquals(points, 5);
  }
});
Deno.test("points calculation - item description length multiple of 3", () => {
  const receipt = validateReceipt({
    "retailer": "",
    "purchaseDate": "2022-04-22",
    "purchaseTime": "10:05",
    "total": "10.20",
    "items": [
      {"shortDescription": "egg", "price": "10.20"}
    ]
  });
  if (receipt) {
    const points = calculatePoints(receipt);
    assertEquals(points, 2);
  }
});

Deno.test("points calculation - purchase date is odd", () => {
  const receipt = validateReceipt({
    "retailer": "",
    "purchaseDate": "2022-03-15",
    "purchaseTime": "12:30",
    "total": "8.24",
    "items": [
      {"shortDescription": "eggs", "price": "8.24"}
    ]
  });
  if (receipt) {
    const points = calculatePoints(receipt);
    assertEquals(points, 6);
  }
});

Deno.test("points calculation - purchase time between 2:00pm and 4:00pm", () => {
  const receipt = validateReceipt({
    "retailer": "",
    "purchaseDate": "2022-03-12",
    "purchaseTime": "14:30",
    "total": "8.24",
    "items": [
      {"shortDescription": "eggs", "price": "8.24"}
    ]
  });
  if (receipt) {
    
    const points = calculatePoints(receipt);
    assertEquals(points, 10);
  }
});