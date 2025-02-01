
import * as crypto from "node:crypto";
import { Application, Router } from "https://deno.land/x/oak/mod.ts";
interface Item{
  shortDescription:string,
  price:number
}
interface Reciept{
  retailer:string,
  purchaseDate:string,
  PurchaseTime:string,
  total:number,
  items:Item[]
}
function processReceipt(req:Reciept){
  const id = crypto.randomUUID();
  return {
    'id':id
  }
}
function getReceiptPoints(req:crypto.UUID){
  return {points:100}
  
}
const router = new Router();
router
  .post("/receipts/process",  async (ctx)=>{
    const req = await ctx.request?.body.json();
    const res = processReceipt(req);
    ctx.response.type='json';
    ctx.response.body = res;
    
  })
  .get("/receipts/:id/points", async (ctx)=>{
    const req = await ctx.request?.body.json();
    const res = getReceiptPoints(req);
    ctx.response.type='json';
    ctx.response.body = res;
    
  });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
