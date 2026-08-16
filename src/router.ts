import { Hono } from 'hono';
import {
  createKnowledgeController,
  showCreateKnowledgeFormController,
} from './controllers/create-knowledge.controller.js';
import { deleteKnowledgeController } from './controllers/delete-knowledge.controller.js';
import { getAllKnowledgesController } from './controllers/get-all-knowledges.controller.js';
import { getKnowledgeDetailController } from './controllers/get-knowledge-detail.controller.js';

export interface Variables {
  userId: string;
}

export const router = new Hono<{ Variables: Variables }>();

router.get('/', async (ctx) => {
  const userId = ctx.get('userId');

  return ctx.html(await getAllKnowledgesController(userId));
});

router.get('/knowledges/new', (ctx) => {
  const userId = ctx.get('userId');

  return ctx.html(showCreateKnowledgeFormController(userId));
});
/**
 * ナレッジ詳細
 */
router.get('/knowledges/:knowledgeId', async (ctx) => {
  const userId = ctx.get('userId'); // ユーザーIDを取得
  const knowledgeId = ctx.req.param('knowledgeId'); // ナレッジIDを取得

  return ctx.html(await getKnowledgeDetailController(userId, knowledgeId)); // ナレッジ詳細コントローラーを呼び出す
});

router.post('/knowledges', async (ctx) => {
  const userId = ctx.get('userId');
  const body = await ctx.req.parseBody();
  const content = body['content'];

  try {
    const result = await createKnowledgeController(userId, content as string);

    if (result === null) {
      return ctx.redirect('/', 303);
    }

    return ctx.html(result);
  } catch (error) {
    console.error('Error in POST /knowledges:', error);
    return ctx.text('Internal Server Error', 500);
  }
});

router.post('/knowledges/:knowledgeId/delete', async (ctx) => {
  const userId = ctx.get('userId');
  const knowledgeId = ctx.req.param('knowledgeId');

  try {
    const result = await deleteKnowledgeController(userId, knowledgeId);

    if (result === null) {
      return ctx.redirect('/', 303);
    }

    return ctx.html(result);
  } catch (error) {
    console.error('Error in POST /knowledges/:knowledgeId/delete:', error);
    return ctx.text('Internal Server Error', 500);
  }
});
