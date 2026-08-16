import { Hono } from 'hono';
import {
  createKnowledgeController,
  showCreateKnowledgeFormController,
} from './controllers/create-knowledge.controller.js';
import { getAllKnowledgesController } from './controllers/get-all-knowledges.controller.js';
import {
  showUpdateKnowledgeFormController,
  updateKnowledgeController,
} from './controllers/update_KnowledgeController.js';

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

router.get('/knowledges/:knowledgeId/edit', async (ctx) => {
  const userId = ctx.get('userId');
  const knowledgeId = ctx.req.param('knowledgeId');

  return ctx.html(await showUpdateKnowledgeFormController(userId, knowledgeId));
});

router.post('/knowledges/:knowledgeId', async (ctx) => {
  const userId = ctx.get('userId');
  const knowledgeId = ctx.req.param('knowledgeId');
  const body = await ctx.req.parseBody();
  const content = body['content'];

  return ctx.html(await updateKnowledgeController(userId, knowledgeId, content as string));
});
