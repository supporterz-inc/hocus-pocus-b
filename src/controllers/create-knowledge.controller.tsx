import { KnowledgeCreateFeature } from '../features/KnowledgeCreateFeature.js';
import { Knowledge } from '../models/knowledge.model.js';
import { KnowledgeRepository } from '../models/knowledge.repository.js';
/**
 *
 * @param userId
 * @returns
 */
export function showCreateKnowledgeFormController(userId: string) {
  return <KnowledgeCreateFeature userId={userId} />;
}

/**
 *
 * @param userId
 * @param content
 * @returns
 */
export async function createKnowledgeController(userId: string, content: string) {
  // ナレッジ作成コントローラー
  if (!content || content.trim().length === 0) {
    // ナレッジの内容が空の場合
    return <KnowledgeCreateFeature error="ナレッジの内容を入力してください" userId={userId} />; // エラーメッセージを表示してナレッジ作成画面を返す
  }

  try {
    const knowledge = Knowledge.create(content.trim(), userId);
    await KnowledgeRepository.upsert(knowledge);

    return null;
  } catch (error) {
    console.error(error);

    return <KnowledgeCreateFeature error="ナレッジの保存に失敗しました。もう一度お試しください。" userId={userId} />;
  }
}
