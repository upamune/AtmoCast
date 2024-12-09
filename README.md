# AtmoCast

日本の主要都市の天気情報をRSSフィードで配信するサービスです。Weather APIで取得した天気情報をGemini APIを使用して自然な日本語に要約し、RSSフィードとして配信します。

## 機能

- 3都市（東京、大阪、福岡）の天気情報をRSS形式で配信
- 毎朝5時に天気情報を自動更新
- Gemini APIによる自然な日本語での天気解説

## 技術スタック

- [Astro](https://astro.build/) - Webフレームワーク
- [React](https://reactjs.org/) - UIコンポーネント
- [Tailwind CSS](https://tailwindcss.com/) - スタイリング
- [Weather API](https://www.weatherapi.com/) - 天気情報の取得
- [Gemini API](https://ai.google.dev/) - 天気情報の要約生成

## 開発環境のセットアップ

1. リポジトリのクローン:
```bash
git clone https://github.com/yourusername/atmocast.git
cd atmocast
```

2. 依存関係のインストール:
```bash
pnpm install
```

3. 環境変数の設定:
`.env.example`をコピーして`.env`を作成し、必要なAPIキーを設定します:
```bash
cp .env.example .env
```

必要な環境変数:
- `WEATHER_API_KEY` - Weather APIのAPIキー
- `GEMINI_API_KEY` - Gemini APIのAPIキー

4. 開発サーバーの起動:
```bash
pnpm dev
```

## スクリプト

| コマンド | 説明 |
|----------|------|
| `pnpm dev` | 開発サーバーを起動 (http://localhost:4321) |
| `pnpm build` | 本番用ビルドを生成 |
| `pnpm preview` | ビルドしたサイトをプレビュー |
| `pnpm update-weather` | 天気情報を手動で更新 |

## プロジェクト構成

```
/
├── src/
│   ├── components/     # UIコンポーネント
│   ├── services/       # 外部APIとの連携
│   │   ├── weather/    # Weather API関連
│   │   └── summary/    # Gemini API関連
│   ├── utils/          # ユーティリティ関数
│   ├── types/          # 型定義
│   └── pages/          # ページコンポーネント
├── scripts/            # スクリプト
├── data/              # 天気データの保存先
└── public/            # 静的ファイル
```

## デプロイ

このプロジェクトはGitHub Actionsを使用して自動デプロイを行います。

1. GitHub Secretsに以下の環境変数を設定:
   - `WEATHER_API_KEY`
   - `GEMINI_API_KEY`

2. GitHub Pagesの設定:
   - リポジトリの Settings > Pages で、デプロイ元を `gh-pages` ブランチに設定

## RSSフィード

各都市の天気情報は以下のURLでRSSフィードとして配信されています:

- 東京: `/tenki/tokyo.xml`
- 大阪: `/tenki/osaka.xml`
- 福岡: `/tenki/fukuoka.xml`

## ライセンス

MIT License - 詳細は [LICENSE](LICENSE) ファイルを参照してください。