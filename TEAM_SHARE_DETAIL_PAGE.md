# ナレッジ詳細表示の実装状況

詳細表示の実装を進めています。今回の変更で、一覧から詳細ページへ遷移できる構成を追加しました。

## 対応内容
- `src/router.ts` に `GET /knowledges/:knowledgeId` を追加
- `knowledgeId` を URL から受け取るようにした
- `getKnowledgeDetailController` を呼ぶようにした
- 詳細画面用のコンポーネントを追加
- 存在しない ID の場合に、見つからない画面を返すようにした
- 一覧ページの各項目から詳細ページへ遷移できるようにした
- 一覧表示を見やすくし、「詳細を見る」リンクと ID の両方を表示するようにした
- 空または不正な `knowledgeId` を未発見として扱うガードを追加した

## 処理ごとの変更まとめ

### 1. ルーティング処理
- 対象: `src/router.ts`
- 変更: `/knowledges/:knowledgeId` を追加
- 実装状況: 完了
- 目的: 一覧から詳細ページへの入口を作る

### 2. 詳細取得処理
- 対象: `src/controllers/get-knowledge-detail.controller.tsx`
- 変更: `KnowledgeRepository.getByKnowledgeId()` を呼び、1 件のナレッジを取得
- 実装状況: 完了
- 目的: ID に対応するナレッジを詳細画面へ渡す

### 3. 詳細表示画面
- 対象: `src/features/KnowledgeDetailFeature.tsx`
- 変更: 作成者、日時、本文を表示する詳細画面を作成
- 実装状況: 完了
- 目的: 読みたいナレッジの内容を見せる

### 4. 未発見時の表示
- 対象: `src/features/KnowledgeNotFoundFeature.tsx`
- 変更: 指定 ID が見つからないときの専用画面を追加
- 実装状況: 完了
- 目的: エラー画面ではなく、案内画面を返す

### 5. 一覧からの遷移
- 対象: `src/features/KnowledgeListFeature.tsx`
- 変更: 「詳細を見る」リンクを追加し、詳細ページへ遷移できるようにした
- 実装状況: 完了
- 目的: 一覧から詳細へ進む導線を作る

## 追加したファイル
- `src/controllers/get-knowledge-detail.controller.tsx`
- `src/features/KnowledgeDetailFeature.tsx`
- `src/features/KnowledgeNotFoundFeature.tsx`

## 変更したファイル
- `src/router.ts`
- `src/features/KnowledgeListFeature.tsx`

## 補足
- 今回の範囲は「詳細表示（Read）」に限定しています
- 更新・削除・認証・投稿者判定は含めていません
- Markdown の整形は最低限対応済みですが、完全な Markdown パーサーまでは入れていません

## 次の確認ポイント
- 一覧からの遷移が正しく動くか
- 既存の ID で本文が表示されるか
- 存在しない ID で not found 表示になるか
- リンク表示が見やすいか、一覧画面の見た目に不自然さがないか
- ブラウザ実行で最終確認を行う

## 元の main との比較

### 元の main のコード（変更前）

対象ファイル: `src/router.ts`

```ts
import { Hono } from 'hono';
import {
  createKnowledgeController,
  showCreateKnowledgeFormController,
} from './controllers/create-knowledge.controller.js';
import { getAllKnowledgesController } from './controllers/get-all-knowledges.controller.js';

export interface Variables {
  userId: string;
}

export const router = new Hono<{ Variables: Variables }>();

router.get('/', async (ctx) => {
  const userId = ctx.get('userId');

  return ctx.html(await getAllKnowledgesController(userId));
});

router.get('/knowledges/new', (ctx) => {
  const userId = ctx.get('userId');

  return ctx.html(showCreateKnowledgeFormController(userId));
});

router.post('/knowledges', async (ctx) => {
  const userId = ctx.get('userId');
  const body = await ctx.req.parseBody();
  const content = body['content'];

  return ctx.html(await createKnowledgeController(userId, content as string));
});
```

### 変更後のコード（現在の実装）

対象ファイル: `src/router.ts`

```ts
import { Hono } from 'hono';
import {
  createKnowledgeController,
  showCreateKnowledgeFormController,
} from './controllers/create-knowledge.controller.js';
import { getAllKnowledgesController } from './controllers/get-all-knowledges.controller.js';
import { getKnowledgeDetailController } from './controllers/get-knowledge-detail.controller.js';

export interface Variables {
  userId: string;
}

export const router = new Hono<{ Variables: Variables }>();

router.get('/', async (ctx) => {
  const userId = ctx.get('userId');

  return ctx.html(await getAllKnowledgesController(userId));
});

router.get('/knowledges/new', (ctx) => {
  const userId = ctx.get('userId');

  return ctx.html(showCreateKnowledgeFormController(userId));
});

router.get('/knowledges/:knowledgeId', async (ctx) => {
  const userId = ctx.get('userId');
  const knowledgeId = ctx.req.param('knowledgeId');

  return ctx.html(await getKnowledgeDetailController(userId, knowledgeId));
});

router.post('/knowledges', async (ctx) => {
  const userId = ctx.get('userId');
  const body = await ctx.req.parseBody();
  const content = body['content'];

  return ctx.html(await createKnowledgeController(userId, content as string));
});
```

### 修正したポイント

- `GET /knowledges/:knowledgeId` を追加した
- `ctx.req.param('knowledgeId')` で URL から ID を取得するようにした
- 取得した ID を `getKnowledgeDetailController` に渡すようにした
- 既存の一覧と作成ルートはそのまま残した

### 追加したファイル

- `src/controllers/get-knowledge-detail.controller.tsx`
- `src/features/KnowledgeDetailFeature.tsx`
- `src/features/KnowledgeNotFoundFeature.tsx`

### 変更したファイル

- `src/router.ts`
- `src/features/KnowledgeListFeature.tsx`

この比較は、元の main から今回の詳細表示実装がどこで差分になったかを確認するための記録です。
