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

async function deleteByKnowledgeId(knowledgeId: string): Promise<void> {
  const delete_file = `./storage/${knowledgeId}.json`;
  await unlink(delete_file);
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
