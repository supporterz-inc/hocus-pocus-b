import type { PropsWithChildren } from 'hono/jsx';
import type { Knowledge } from '../models/knowledge.model.js';
import { Layout } from './Layout.js';

interface Props {
  userId: string;
  knowledge: Knowledge;
}
/**
 * Render the content of a knowledge in a simple markdown-like format.
 * Supports headings, paragraphs, and unordered lists.
 *
 * @param content - The content of the knowledge to render.
 * @returns An array of JSX elements representing the rendered content.
 */
function renderMarkdownContent(content: string) {
  // ナレッジの内容をマークダウン風にレンダリングする関数
  const lines = content.split(/\n/);
  const nodes: unknown[] = []; // レンダリングされたノードを格納する配列
  const listItems: string[] = []; // 現在のリストアイテムを格納する配列

  const flushList = () => {
    // 現在のリストアイテムをレンダリングしてnodesに追加する関数
    if (listItems.length === 0) {
      return;
    }

    nodes.push(
      // リストアイテムをul要素としてレンダリングしてnodesに追加
      <ul class="mt-2 list-disc pl-5">
        {listItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>,
    );
    listItems.length = 0;
  };

  lines.forEach((line, index) => {
    // 各行を処理するループ
    const trimmed = line.trim();

    if (trimmed === '') {
      // 空行の場合はリストをフラッシュして、空のdivを追加
      flushList();
      nodes.push(<div class="h-2" key={`empty-${index}`} />);
      return;
    }

    if (trimmed.startsWith('- ')) {
      // リストアイテムの場合はlistItemsに追加
      listItems.push(trimmed.replace(/^-\s*/, ''));
      return;
    }

    flushList(); // リストアイテムが終了した場合はリストをフラッシュ

    if (trimmed.startsWith('# ')) {
      nodes.push(
        <h2 class="mt-4 text-lg font-bold" key={`heading-${index}`}>
          {trimmed.replace(/^#\s*/, '')}
        </h2>,
      );
      return;
    }

    nodes.push(
      <p class="mt-2" key={`paragraph-${index}`}>
        {trimmed}
      </p>,
    );
  });

  flushList();

  return nodes;
}

export function KnowledgeDetailFeature({ userId, knowledge }: PropsWithChildren<Props>) {
  const canDelete = userId === knowledge.authorId;

  return (
    <Layout title="ナレッジ詳細">
      <div class="p-4">
        <p>
          こんにちは <span class="text-blue-100 font-bold">{userId}</span> さん
        </p>
        <h1 class="mt-4 mb-2">ナレッジ詳細</h1>
        <p class="mt-2">作成者: {knowledge.authorId}</p>
        <p class="mt-2">作成日時: {new Date(knowledge.createdAt * 1000).toLocaleString('ja-JP')}</p>
        <p class="mt-2">更新日時: {new Date(knowledge.updatedAt * 1000).toLocaleString('ja-JP')}</p>
        <div class="mt-4 rounded border border-gray-300 bg-gray-50 p-3">{renderMarkdownContent(knowledge.content)}</div>

        <div class="mt-4 flex items-center gap-3">
          <a class="block" href="/">
            ← 一覧に戻る
          </a>
          {canDelete ? (
            <form action={`/knowledges/${knowledge.knowledgeId}/delete`} method="post">
              <button
                class="bg-red-500 px-3 py-2 text-sm text-white hover:bg-red-700"
                onclick="return confirm('このナレッジを削除しますか？')"
                type="submit"
              >
                削除する
              </button>
            </form>
          ) : null}
        </div>
      </div>
    </Layout>
  );
}
