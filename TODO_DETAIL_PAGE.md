# ナレッジ詳細ページ実装 TODO（要件確認版）

このファイルは、CHALLENGE.md に定義された「ナレッジ詳細表示 (Read)」の実装順を、後から入った人が追いやすいように整理したものです。

## 要件確認

CHALLENGE.md の該当要件は次の通りです。

- ナレッジ詳細表示 (Read): 特定のナレッジの詳細ページを、誰でも閲覧できる

つまり、この作業は「更新・削除」ではなく、Read である「詳細表示」の実装に限定します。

## 対象範囲

- 実装対象: 詳細ページの表示
- 対象外: 更新、削除、認証ロジック、投稿者判定
- 目標: 詳細ページが読める状態を最小構成で実現する

## 実装方針

- URL の `knowledgeId` を受け取る
- `KnowledgeRepository.getByKnowledgeId()` を使って 1 件取得する
- 取得したデータを画面へ渡す
- 一覧ページから詳細ページへ遷移できるようにする
- 最初は「本文が見える」状態を優先する

## TODO

### 1. ルーティングの追加
- [x] `src/router.ts` に `GET /knowledges/:knowledgeId` を追加する
- [x] `knowledgeId` を URL パラメータとして受け取る
- [x] ルートから詳細取得用のコントローラーを呼ぶ

### 2. コントローラーの追加
- [x] `src/controllers/get-knowledge-detail.controller.tsx` を作成する
- [x] `KnowledgeRepository.getByKnowledgeId(knowledgeId)` を呼ぶ
- [x] 取得したナレッジを詳細画面コンポーネントへ渡す
- [x] 存在しない `knowledgeId` の場合の表示を考える

### 3. 詳細画面コンポーネントの追加
- [x] `src/features/KnowledgeDetailFeature.tsx` を作成する
- [x] `Layout` を使ってページ枠組みを作る
- [x] 作成者、作成日時、更新日時、本文を表示する
- [x] 一覧へ戻るリンクを追加する
- [x] Markdown 表示の整形を最低限対応する

### 4. 一覧ページのリンク追加
- [x] `src/features/KnowledgeListFeature.tsx` の各ナレッジ表示をリンク化する
- [x] `/knowledges/{knowledgeId}` に遷移するようにする
- [x] 一覧から詳細ページへ遷移できるようにする

### 5. エラー時の確認
- [x] 存在しない ID にアクセスしたときの挙動を確認する
- [x] 取得できない場合に、ユーザーに分かるメッセージを返せるようにする
- [x] 一覧からの遷移で想定どおり動く流れを整える

### 6. 動作確認
- [ ] ナレッジを作成して一覧を確認する
- [ ] 一覧から詳細ページへ遷移する
- [ ] 詳細ページに本文が表示される
- [ ] 一覧へ戻れる

> 注記: 実装の本体は完了しているが、最終確認まではブラウザでの実行検証が残っている。

## やらないこと

- 更新機能の実装
- 削除機能の実装
- 投稿者本人のみ更新削除可能にするロジック
- 認証周りの実装

これらは別タスクとして管理する。

## 参考になる既存ファイル

- `src/router.ts` : ルーティングの入口
- `src/controllers/get-all-knowledges.controller.tsx` : 一覧取得の参考
- `src/controllers/create-knowledge.controller.tsx` : コントローラーの書き方の参考
- `src/features/KnowledgeListFeature.tsx` : 一覧画面の表示例
- `src/features/KnowledgeCreateFeature.tsx` : フォーム画面の表示例
- `src/models/knowledge.repository.ts` : 1 件取得の参照元
- `src/models/knowledge.model.ts` : ナレッジのデータ構造

## 実装完了の目安

- 一覧にあるナレッジをクリックして詳細ページが開く
- 該当ナレッジの本文が表示される
- 一覧へ戻るリンクが効く
- 存在しない ID のときに適切な扱いができる

この状態が達成できれば、詳細表示の要件は満たせている。
