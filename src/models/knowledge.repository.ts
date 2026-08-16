import { glob, mkdir, readFile, unlink, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import type { Knowledge } from './knowledge.model.js';

const STORAGE_DIR = './storage/knowledges';

function toFilePath(knowledgeId: string): string {
  return join(STORAGE_DIR, `${knowledgeId}.json`);
}

async function readKnowledge(file: string): Promise<Knowledge> {
  const raw = await readFile(file, 'utf-8');
  return JSON.parse(raw) as Knowledge;
}

async function getAll(): Promise<Knowledge[]> {
  const files = await Array.fromAsync(glob(`${STORAGE_DIR}/**/*.json`)); //ファイルを持ってきてる．文字の配列

  const knowledges = await Promise.all(files.map((file) => readKnowledge(file)));

  return knowledges;
}

export const KnowledgeRepository = {
  async getByKnowledgeId(knowledgeId: string): Promise<Knowledge> {
    const file = toFilePath(knowledgeId);

    try {
      return await readKnowledge(file);
    } catch (error) {
      const err = error as NodeJS.ErrnoException;
      if (err.code === 'ENOENT') {
        throw new Error(`Knowledge not found: ${knowledgeId}`);
      }
      throw error;
    }
  },

  async getByAuthorId(authorId: string): Promise<Knowledge[]> {
    const knowledges = await getAll();

    return knowledges.filter((knowledge) => knowledge.authorId === authorId);
  },

  async getAll(): Promise<Knowledge[]> {
    return await getAll();
  },

  async getAll_api() {
    // 全てのナレッジを取得
    return await this.getAll();
  },
  /**
   * @description ナレッジを保存する関数
   * @returns Promise<void>
   * @function
   * @param knowledge
   */
  async upsert(knowledge: Knowledge): Promise<void> {
    await mkdir(STORAGE_DIR, { recursive: true }); //ディレクトリを作ってる

    const file = toFilePath(knowledge.knowledgeId); // ファイルパスを生成
    const content = JSON.stringify(knowledge, null, 2); // ナレッジをJSON 文字列に変換

    await writeFile(file, content, 'utf-8'); // ファイルに書き込み
  },

  async deleteByKnowledgeId(knowledgeId: string): Promise<void> {
    const file = toFilePath(knowledgeId);

    try {
      await unlink(file);
    } catch (error) {
      const err = error as NodeJS.ErrnoException;
      if (err.code !== 'ENOENT') {
        throw error;
      }
    }
  },
};
