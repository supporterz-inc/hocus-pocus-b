import { HTTPException } from 'hono/http-exception';
import { KnowledgeEditFeature } from '../features/KnowledgeEditFeature.js';
import { KnowledgeListFeature } from '../features/KnowledgeListFeature.js';
import { Knowledge } from '../models/knowledge.model.js';
import { KnowledgeRepository } from '../models/knowledge.repository.js';

async function getKnowledgeOrThrow(knowledgeId: string) {
  try {
    return await KnowledgeRepository.getByKnowledgeId(knowledgeId);
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('Knowledge not found:')) {
      throw new HTTPException(404, { message: '指定されたナレッジが見つかりません。' });
    }

    throw error;
  }
}

export async function showUpdateKnowledgeFormController(userId: string, knowledgeId: string) {
  const knowledge = await getKnowledgeOrThrow(knowledgeId);

  if (knowledge.authorId !== userId) {
    throw new HTTPException(403, { message: 'このナレッジを編集する権限がありません。' });
  }

  return <KnowledgeEditFeature knowledge={knowledge} userId={userId} />;
}

export async function updateKnowledgeController(userId: string, knowledgeId: string, content: string) {
  const knowledge = await getKnowledgeOrThrow(knowledgeId);

  if (knowledge.authorId !== userId) {
    throw new HTTPException(403, { message: 'このナレッジを編集する権限がありません。' });
  }

  if (!content || content.trim().length === 0) {
    return <KnowledgeEditFeature error="ナレッジの内容を入力してください" knowledge={knowledge} userId={userId} />;
  }

  const updatedKnowledge = Knowledge.update(knowledge, content.trim());
  await KnowledgeRepository.upsert(updatedKnowledge);
  const knowledges = await KnowledgeRepository.getAll_api();

  return <KnowledgeListFeature knowledges={knowledges} userId={userId} />;
}
