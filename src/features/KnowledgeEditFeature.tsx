import type { Knowledge } from '../models/knowledge.model.js';
import { Layout } from './Layout.js';

interface Props {
  userId: string;
  knowledge: Knowledge;
  error?: string;
}

export function KnowledgeEditFeature({ userId, knowledge, error }: Props) {
  return (
    <Layout title="ナレッジ編集">
      <div class="p-4">
        <h1 class="mb-4">ナレッジを編集</h1>
        <p class="mb-6">
          編集者: <span class="font-bold text-blue-500">{userId}</span>
        </p>
        {error ? <p class="mb-4 bg-red-100 p-4 text-red-700">{error}</p> : null}
        <form action={`/knowledges/${knowledge.knowledgeId}`} method="post">
          <div class="mb-6">
            <label for="content">Markdown</label>
            <textarea
              class="h-64 w-full"
              id="content"
              name="content"
              placeholder="Markdown形式で入力してください..."
              required
            >
              {knowledge.content}
            </textarea>
          </div>
          <button class="bg-blue-500 text-white hover:bg-blue-700" type="submit">
            保存する
          </button>
        </form>
        <a class="mt-4 block" href="/">
          ← 一覧に戻る
        </a>
      </div>
    </Layout>
  );
}
