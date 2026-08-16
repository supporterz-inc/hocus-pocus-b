import type { Knowledge } from '../models/knowledge.model.js';
import { KnowledgeRepository } from '../models/knowledge.repository.js';

export async function deleteKnowledgeController(userId: string, knowledgeId: string) {
  let knowledge: Knowledge;

  try {
    knowledge = await KnowledgeRepository.getByKnowledgeId(knowledgeId);
  } catch (error) {
    console.error(error);
    return <div>ナレッジが見つかりません</div>;
  }

  if (userId !== knowledge.authorId) {
    return <div>このナレッジを削除する権限がありません</div>;
  }

  try {
    await KnowledgeRepository.deleteByKnowledgeId(knowledgeId);
    return null;
  } catch (error) {
    console.error(error);
    return <div>削除に失敗しました</div>;
  }
}
