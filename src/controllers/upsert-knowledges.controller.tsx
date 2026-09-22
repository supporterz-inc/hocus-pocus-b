import type { Knowledge } from '../models/knowledge.model.js';
import { KnowledgeRepository } from '../models/knowledge.repository.js';

export async function upsertKnowledgesController(knowledge: Knowledge) {
  const knowledges = await KnowledgeRepository.upsert(knowledge);

  return knowledges;
}
