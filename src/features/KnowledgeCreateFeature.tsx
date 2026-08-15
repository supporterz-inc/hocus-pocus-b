import type { PropsWithChildren } from 'hono/jsx';
import { Layout } from './Layout.js';

interface Props {
  userId: string;
  error?: string;
}

export function KnowledgeCreateFeature({ userId, error }: PropsWithChildren<Props>) {
  return (
    <Layout title="ナレッジ作成">
      <div class="p-4">
        <h1 class="mb-4">新しいナレッジを作成</h1>
        <p class="mb-6">
          作成者: <span class="text-blue-500 font-bold">{userId}</span>
        </p>
        {error ? <p class="mb-4 bg-red-100 p-4 text-red-700">{error}</p> : null}
        <form action="/knowledges" method="post">
          <div class="mb-6">
            <label for="content">Markdown</label>
            <textarea
              class="h-64 w-full"
              id="content"
              name="content"
              placeholder="Markdown形式で入力してください..."
              required
            />
          </div>
          <button class="bg-blue-500 text-white hover:bg-blue-700" type="submit">
            投稿する
          </button>
        </form>
        <a class="mt-4 block" href="/">
          ← 一覧に戻る
        </a>
      </div>
    </Layout>
  );
}
