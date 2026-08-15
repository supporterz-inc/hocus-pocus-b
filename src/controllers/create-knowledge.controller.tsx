import { KnowledgeCreateFeature } from '../features/KnowledgeCreateFeature.js';
import { KnowledgeListFeature } from '../features/KnowledgeListFeature.js';
import { Knowledge } from '../models/knowledge.model.js';
import { KnowledgeRepository } from '../models/knowledge.repository.js';

export function showCreateKnowledgeFormController(userId: string) {
  return <KnowledgeCreateFeature userId={userId} />;
}

export async function createKnowledgeController(userId: string, content: string) {
  if (!content || content.trim().length === 0) {
    return <KnowledgeCreateFeature error="ナレッジの内容を入力してください" userId={userId} />;
  }

  try {
    const knowledge = Knowledge.create(content.trim(), userId);
    await KnowledgeRepository.upsert(knowledge);
    const knowledges = await KnowledgeRepository.getAll_api();

    return <KnowledgeListFeature knowledges={knowledges} userId={userId} />;
  } catch (error) {
    console.error(error);

    return <KnowledgeCreateFeature error="ナレッジの保存に失敗しました。もう一度お試しください。" userId={userId} />;
  }
}
