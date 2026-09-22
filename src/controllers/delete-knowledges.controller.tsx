import { KnowledgeRepository } from '../models/knowledge.repository.js';

export async function deleteKnowledgesController(knowledgeId: string) {
  const knowledges = await KnowledgeRepository.deleteByKnowledgeId(knowledgeId);

  return knowledges;
}
