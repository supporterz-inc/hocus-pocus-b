import { Layout } from './Layout.js';

export function KnowledgeCreateFeature() {
  return (
    <Layout title="ナレッジ作成">
      <h1>ナレッジ作成</h1>
      <form action="/knowledges" method="post">
        <p>
          <label for="content">ナレッジ本文</label>
        </p>
        <p>
          <textarea
            class="border"
            id="content"
            name="content"
            placeholder="ナレッジ本文を入力してください"
            required
            rows={20}
          />
        </p>
        <button class="inline-block rounded bg-blue-600 px-4 py-2 text-white" type="submit">
          作成する
        </button>
      </form>
    </Layout>
  );
}
