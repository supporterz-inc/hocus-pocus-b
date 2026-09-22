import { Hono } from 'hono';
import { deleteKnowledgesController } from './controllers/delete-knowledges.controller.js';
import { getAllKnowledgesController } from './controllers/get-all-knowledges.controller.js';
import { upsertKnowledgesController } from './controllers/upsert-knowledges.controller.js';
import { KnowledgeCreateFeature } from './features/KnowledgeCreateFeature.js';
import { Knowledge } from './models/knowledge.model.js';

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
//初期画面
router.get('/', (ctx) => {
  // MEMO: `ctx.get(keyof Variables)` によって、必要に応じて値を利用できる
  const userId = ctx.get('userId');
  const userName = ctx.get('userName');
  console.log(`Signed-in : ${userName} (${userId})`);

  // MEMO: Controller は Context を直接受け取らず、必要な情報のみを引数に受け取る
  return ctx.html(getAllKnowledgesController(userId));
});
// 新規作成画面
router.get('/knowledges/new', (ctx) => {
  return ctx.html(KnowledgeCreateFeature());
});
//作成保存
router.post('/knowledges', async (ctx) => {
  const body = await ctx.req.parseBody();
  const content = body['content'];
  const userId = ctx.get('userId');
  if (typeof content !== 'string') {
    return ctx.text('本文を入力してください', 400);
  }
  const knowledge = Knowledge.create(content, ctx.get('userId'));

  upsertKnowledgesController(knowledge);
  return ctx.html(getAllKnowledgesController(userId));
});
//削除処理
router.get(`/knowledges/:knowledgeId/delete`, async (ctx) => {
  const knowledgeId = ctx.req.param('knowledgeId');
  await deleteKnowledgesController(knowledgeId);
  const userId = ctx.get('userId');
  return ctx.html(getAllKnowledgesController(userId));
});
