import { glob, readFile, unlink, writeFile } from 'node:fs/promises';

import type { Knowledge } from './knowledge.model.js';

async function getAll(): Promise<Knowledge[]> {
  const files = await Array.fromAsync(glob('./storage/**/*.json'));

  const knowledges = await Promise.all(files.map((file) => readFile(file, 'utf-8').then(JSON.parse)));

  return knowledges;
}
async function upsert(knowledge: Knowledge): Promise<void> {
  const create_file = `./storage/${knowledge.knowledgeId}.json`;
  const data = JSON.stringify(knowledge);
  await writeFile(create_file, data, 'utf8');
}

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function isKnowledgeId(value: string): boolean {
  return uuidPattern.test(value);
}

async function deleteByKnowledgeId(knowledgeId: string): Promise<void> {
  console.log(`Deleting knowledge with knowledgeId: ${knowledgeId}`);
  if (!isKnowledgeId(knowledgeId)) {
    throw new Error('Invalid knowledgeId');
  }

  const filePath = `./storage/${knowledgeId}.json`;
  await unlink(filePath);
}

export const KnowledgeRepository = {
  // biome-ignore lint/suspicious/noExplicitAny: TODO: (学生向け) 実装する
  getByKnowledgeId: (_: string): Promise<Knowledge> => undefined as any,

  // biome-ignore lint/suspicious/noExplicitAny: TODO: (学生向け) 実装する
  getByAuthorId: (_: string): Promise<Knowledge[]> => undefined as any,

  getAll,

  upsert,

  deleteByKnowledgeId,
};
