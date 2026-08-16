import type { Knowledge } from '../models/knowledge.model.js';
import { Layout } from './Layout.js';

interface Props {
  userId: string;
  knowledges: Knowledge[];
}

export function KnowledgeListFeature({ userId, knowledges }: Props) {
  return (
    <Layout title="ナレッジ一覧">
      <p>
        こんにちは <span class="text-blue-100 font-bold">{userId}</span> さん
      </p>
      {knowledges.length ? (
        <ul>
          {knowledges.map((knowledge) => (
            <li class="mb-2" key={knowledge.knowledgeId}>
              <a class="text-blue-600 underline" href={`/knowledges/${knowledge.knowledgeId}`}>
                詳細を見る
              </a>
              <span class="ml-2 text-gray-500">{knowledge.knowledgeId}</span>
            </li>
          ))}
        </ul>
      ) : (
        <ul>
          <li>投稿済みのナレッジは 0 件です</li>
        </ul>
      )}
    </Layout>
  );
}
