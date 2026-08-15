import { Hono } from 'hono';
import {
  createKnowledgeController,
  showCreateKnowledgeFormController,
} from './controllers/create-knowledge.controller.js';
import { getAllKnowledgesController } from './controllers/get-all-knowledges.controller.js';

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

router.post('/knowledges', async (ctx) => {
  const userId = ctx.get('userId');
  const body = await ctx.req.parseBody();
  const content = body['content'];

  return ctx.html(await createKnowledgeController(userId, content as string));
});
