import { Layout } from './Layout.js';

interface Props {
  status: number;
  message: string;
}

export function ErrorPage({ status, message }: Props) {
  return (
    <Layout title="エラー">
      <div class="p-4">
        <h1 class="mb-4">更新できません。ごめんなさい</h1>
        <p class="mb-2 text-gray-600">エラーコード: {status}</p>
        <p class="mb-6">{message}</p>
        <a class="text-blue-600 underline" href="/">
          一覧に戻る
        </a>
      </div>
    </Layout>
  );
}
