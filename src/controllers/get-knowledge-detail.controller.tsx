import { KnowledgeDetailFeature } from '../features/KnowledgeDetailFeature.js';
import { KnowledgeNotFoundFeature } from '../features/KnowledgeNotFoundFeature.js';
import { KnowledgeRepository } from '../models/knowledge.repository.js';

/**
 *
 * @param userId
 * @param knowledgeId
 * @returns
 */
export async function getKnowledgeDetailController(userId: string, knowledgeId: string) {
  if (!knowledgeId || knowledgeId.trim().length === 0) {
    return <KnowledgeNotFoundFeature knowledgeId={knowledgeId} userId={userId} />; // ナレッジIDが空の場合はナレッジが見つからない画面を返す
  }

  try {
    const knowledge = await KnowledgeRepository.getByKnowledgeId(knowledgeId);

    return <KnowledgeDetailFeature knowledge={knowledge} userId={userId} />;
  } catch (error) {
    const err = error as Error;

    if (err.message.includes('Knowledge not found')) {
      return <KnowledgeNotFoundFeature knowledgeId={knowledgeId} userId={userId} />;
    }

    throw error;
  }
}
