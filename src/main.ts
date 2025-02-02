import { Receipt,UnverifiedReceipt } from './types.ts';
import { calculatePoints, validateReceipt } from "./helpers.ts";
import * as crypto from "node:crypto";
import { Application, Router } from "https://deno.land/x/oak/mod.ts";


const kv = await Deno.openKv();


function processReceipt(receipt:Receipt) {
  const id = crypto.randomUUID();
  kv.set(["receipt", id], receipt);
  return {
    "id": id,
  };
}

async function getReceiptPoints(id: crypto.UUID) {
  let points = 0;
  console.log(id);
  const cachedPoints = await kv.get<number>(["receipt", id, "points"]);
  if (cachedPoints.value) {
    return { "points": cachedPoints.value };
  }
  const receiptkv = await kv.get<Receipt>(["receipt", id]);
  if (receiptkv.value) {
    const receipt = receiptkv.value;
    // calculate points based on rules provided
    points = calculatePoints(receipt);
  }
  return { "points": points };
}

// Route Handler
const router = new Router();
router
  .post("/receipts/process", async (ctx) => {
    const req = await ctx.request?.body.json();
    const receipt = validateReceipt(req);
    if(!receipt){
      ctx.throw(400,'invalid receipt');
      return;
    }
    const res = processReceipt(receipt);
      ctx.response.type = "json";
      ctx.response.body = res;
    
  })
  .get("/receipts/:id/points", async (ctx) => {
    const id = ctx?.params?.id as crypto.UUID;
    const res = await getReceiptPoints(id);
    ctx.response.type = "json";
    ctx.response.body = res;
  })
  .get("/receipts/list", (ctx) => {
    ctx.response.type = "json";
    ctx.response.body = kv.list({ "prefix": ["receipts"] });
  });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
