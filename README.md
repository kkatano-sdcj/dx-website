# TechNews Hub - テック系社内ニュースサイト

## 概要
TechNews Hubは、AI・テクノロジーの最前線から社内ニュースまで、あなたの知識を加速させるプラットフォームです。

## 機能
- AI系ニュースの発信
- AI活用情報
- テクニカルタームの解説
- 学習コンテンツの配信
- Podcastの配信
- 社内ニュース配信
- イベント告知

## 技術スタック
- **フロントエンド**: React 18, TypeScript, Tailwind CSS
- **CMS**: Strapi 4.15.5
- **データベース**: SQLite (開発環境)
- **API**: REST API
- **ルーティング**: React Router

## セットアップ

### フロントエンド
```bash
npm install
npm run dev
```

### Strapi CMS
```bash
cd strapi-backend
npm install
npm run develop
```

## Strapi CMS 設定

### 初回セットアップ
1. Strapi管理画面にアクセス: http://localhost:1337/admin
2. 管理者アカウントを作成
3. コンテンツタイプが自動的に作成されます

### コンテンツタイプ
- **Article**: 記事コンテンツ
- **Category**: 記事カテゴリー
- **Author**: 執筆者情報
- **Tag**: 記事タグ
- **Podcast**: ポッドキャストエピソード
- **Event**: イベント情報

### API エンドポイント
- Articles: `GET /api/articles`
- Categories: `GET /api/categories`
- Authors: `GET /api/authors`
- Podcasts: `GET /api/podcasts`
- Events: `GET /api/events`

## 使用方法

### 記事の作成
1. Strapi管理画面にログイン
2. Content Manager > Articles
3. 新しい記事を作成
4. 必要な情報を入力して公開

### カテゴリーの管理
1. Content Manager > Categories
2. カテゴリーを作成・編集
3. 色とアイコンを設定

### イベントの管理
1. Content Manager > Events
2. イベント情報を入力
3. 開催日時と場所を設定

## 開発

### カスタムフック
- `useArticles`: 記事データの取得
- `useCategories`: カテゴリーデータの取得
- `usePodcasts`: ポッドキャストデータの取得
- `useEvents`: イベントデータの取得

### API サービス
- `articlesApi`: 記事関連のAPI呼び出し
- `categoriesApi`: カテゴリー関連のAPI呼び出し
- `podcastsApi`: ポッドキャスト関連のAPI呼び出し
- `eventsApi`: イベント関連のAPI呼び出し

## デプロイ

### フロントエンド
```bash
npm run build
```

### Strapi
```bash
cd strapi-backend
npm run build
npm start
```

## ライセンス
MIT License