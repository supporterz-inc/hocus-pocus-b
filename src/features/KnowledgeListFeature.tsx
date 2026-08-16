import type { Knowledge } from '../models/knowledge.model.js';
import { Layout } from './Layout.js';

interface Props {
  userId: string;
  knowledges: Knowledge[];
}

export function KnowledgeListFeature({ userId, knowledges }: Props) {
  return (
    <Layout title="ナレッジ一覧">
      <div class="mb-6 flex items-center justify-between">
        <p>
          こんにちは <span class="text-blue-100 font-bold">{userId}</span> さん
        </p>
        <a class="bg-blue-500 px-4 py-2 text-white hover:bg-blue-700" href="/knowledges/new">
          新規作成
        </a>
      </div>
      {knowledges.length ? (
        <ul class="space-y-4">
          {knowledges.map((knowledge) => (
            <li class="border border-gray-200 bg-white p-4 shadow-sm" key={knowledge.knowledgeId}>
              <div class="mb-3 flex items-center justify-between gap-4">
                <div>
                  <p class="text-sm text-gray-500">投稿者: {knowledge.authorId}</p>
                  <p class="mt-1 text-xs text-gray-400">ID: {knowledge.knowledgeId}</p>
                </div>
                <div class="flex items-center gap-2">
                  <a
                    class="shrink-0 border border-blue-500 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50"
                    href={`/knowledges/${knowledge.knowledgeId}`}
                  >
                    詳細を見る
                  </a>
                  <a
                    class="shrink-0 border border-gray-400 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100"
                    href={`/knowledges/${knowledge.knowledgeId}/edit`}
                  >
                    編集
                  </a>
                </div>
              </div>
              <p class="whitespace-pre-wrap break-words leading-7">{knowledge.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p class="border border-dashed border-gray-300 p-6 text-center text-gray-500">投稿済みのナレッジは 0 件です</p>
      )}
    </Layout>
  );
}
