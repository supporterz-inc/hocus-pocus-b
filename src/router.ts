import { Hono } from "hono";
import { getAllKnowledgesController } from "./controllers/get-all-knowledges.controller.js";
import { KnowledgeCreateFeature } from "./features/KnowledgeCreateFeature.js";
import { create } from "./models/knowledge.model.js";

export interface Variables {
  /**
   * Signed-in User の一意な ID
   */
  userId: string;

  /**
   * Signed-in User の名前 (重複する可能性あり)
   */
  userName: string;
}

export const router = new Hono<{ Variables: Variables }>();

router.get("/", (ctx) => {
  // MEMO: `ctx.get(keyof Variables)` によって、必要に応じて値を利用できる
  const userId = ctx.get("userId");
  const userName = ctx.get("userName");
  console.log(`Signed-in : ${userName} (${userId})`);

  // MEMO: Controller は Context を直接受け取らず、必要な情報のみを引数に受け取る
  return ctx.html(getAllKnowledgesController(userId));
});

router.get("/knowledges/new", (ctx) => {
  return ctx.html(KnowledgeCreateFeature());
});

router.post("/knowledges", async (ctx) => {
  const body = await ctx.req.parseBody();
  create.content = body["content"];

  return ctx.text(`受け取った本文:\n${content}`);
});
