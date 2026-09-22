import type { Knowledge } from '../models/knowledge.model.js';
import { Layout } from './Layout.js';

interface Props {
  userName: string;
  knowledges: Knowledge[];
}

export function KnowledgeListFeature({ userName, knowledges }: Props) {
  return (
    <Layout title="ナレッジ一覧">
      <p>
        こんにちは <span class="text-yellow-500 font-bold">{userName}</span> さん
      </p>
      {knowledges.length ? (
        <ul>
          {knowledges.map((knowledge) => (
            <li key={knowledge.knowledgeId}>
              {knowledge.knowledgeId}
              <form action={`/knowledges/${knowledge.knowledgeId}/delete`}>
                <button class="inline-block rounded bg-blue-600 px-4 py-2 text-white" type="submit">
                  削除
                </button>
              </form>
            </li>
          ))}
        </ul>
      ) : (
        <ul>
          <li>投稿済みのナレッジは 0 件です</li>
        </ul>
      )}
      <button class="inline-block rounded bg-blue-600 px-4 py-2 text-white" type="submit">
        <a href="/knowledges/new">ナレッジを新規作成する</a>
      </button>
    </Layout>
  );
}
