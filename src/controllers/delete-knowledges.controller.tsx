import { KnowledgeRepository } from '../models/knowledge.repository.js';

export async function deleteKnowledgesController(knowledgeId: string, userId: string) {
  const knowledges = await KnowledgeRepository.deleteByKnowledgeId(knowledgeId, userId);

  return knowledges;
}
