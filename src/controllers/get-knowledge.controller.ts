import type { Knowledge } from '../models/knowledge.model.js';
import { KnowledgeRepository } from '../models/knowledge.repository.js';

type GetKnowledgeResult =
  | { status: 200; knowledge: Knowledge }
  | { status: 403; error: 'このナレッジを取得する権限がありません' }
  | { status: 404; error: 'ナレッジが見つかりません' }
  | { status: 500; error: 'ナレッジの取得に失敗しました' };

export async function getKnowledgeController(userId: string, knowledgeId: string): Promise<GetKnowledgeResult> {
  try {
    const knowledge = await KnowledgeRepository.getByKnowledgeId(knowledgeId);

    if (knowledge.authorId !== userId) {
      return { status: 403, error: 'このナレッジを取得する権限がありません' };
    }

    return { status: 200, knowledge };
  } catch (error) {
    if (error instanceof Error && error.message === `Knowledge not found: ${knowledgeId}`) {
      return { status: 404, error: 'ナレッジが見つかりません' };
    }

    console.error(error);
    return { status: 500, error: 'ナレッジの取得に失敗しました' };
  }
}