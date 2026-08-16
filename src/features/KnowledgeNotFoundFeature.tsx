import type { PropsWithChildren } from 'hono/jsx';
import { Layout } from './Layout.js';

interface Props {
  userId: string;
  knowledgeId: string;
}

export function KnowledgeNotFoundFeature({ userId, knowledgeId }: PropsWithChildren<Props>) {
  return (
    <Layout title="ナレッジが見つかりません">
      <div class="p-4">
        <p>
          こんにちは <span class="text-blue-100 font-bold">{userId}</span> さん
        </p>
        <h1 class="mt-4 mb-2">ナレッジが見つかりません</h1>
        <p class="mt-2">指定されたナレッジID: {knowledgeId}</p>
        <p class="mt-2">削除済みか、URL が正しくない可能性があります。</p>
        <a class="mt-4 block" href="/">
          ← 一覧に戻る
        </a>
      </div>
    </Layout>
  );
}
