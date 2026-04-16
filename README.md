## 全角半角変換（zenhan-converter）

**全角半角変換** は、テキストファイル（`.txt` / `.md`）中の文字を、あらかじめ指定したルールに従って **全角⇔半角** に一括変換する Cursor / VS Code 互換拡張機能です。

### 主な機能

- **対象ファイル**: 拡張子が `.txt` または `.md` のテキストファイル
- **対象文字種を細かく指定**: アルファベット、数字、スペース、句読点、記号、括弧、演算子などを個別に設定可能
- **変換方向の切り替え**: 各文字種ごとに「そのまま / 全角 / 半角」を選択
- **選択範囲のみ変換 / ファイル全体変換** に対応
- 変換後に **ステータスバーで変換した文字数を表示**

### インストール

#### VSIX ファイルからインストール（推奨）

1. [Releases](https://github.com/moriyakeiichi/zenhan-converter) ページ、またはリポジトリのルートから `zenhan-converter-x.x.x.vsix` をダウンロードします。
2. Cursor / VS Code を開き、次のいずれかの方法でインストールします。
   - **コマンドパレット**（`Cmd+Shift+P` / `Ctrl+Shift+P`）→ `Extensions: Install from VSIX...` を選択 → ダウンロードした `.vsix` ファイルを指定
   - **ターミナル**から:

     ```bash
     code --install-extension zenhan-converter-1.0.0.vsix
     ```

3. インストール後、エディターを再読み込みすると使えるようになります。

#### ソースからビルドする場合（開発者向け）

1. このリポジトリをクローンします。
2. ルートディレクトリで依存関係をインストールします。

   ```bash
   npm install
   ```

3. Cursor / VS Code でこのフォルダを開き、「実行とデバッグ」から拡張機能の開発ホストを起動します。

### 使い方

1. `.txt` または `.md` ファイルを開きます。
2. 必要に応じて変換したい範囲を選択します。
   - 選択範囲がある場合: **その範囲のみ** 変換されます。
   - 複数選択している場合: それぞれの範囲が順に変換されます。
   - 選択がない場合: ファイル全体が変換対象候補になります。
3. 次のどちらかの方法でコマンドを実行します。
   - エディター上で右クリック → **「全角／半角変換」** を選択
   - キーボードショートカットを押す  
     - **macOS**: `Cmd` + `Alt` + `Shift` + `K`  
     - **Windows / Linux**: `Ctrl` + `Alt` + `Shift` + `K`

4. 選択範囲がない場合、ファイル全体を変換するかどうかを確認するダイアログが表示されます。
   - 「はい」を選ぶとファイル全体を変換します。
   - それ以外を選ぶと変換は実行されません。

5. 変換が完了すると、ステータスバーに **「◯文字を変換しました」** と表示されます。通常の Undo（`Cmd+Z` / `Ctrl+Z`）で変換を元に戻せます。

### コマンド・ショートカット

- **コマンド ID**: `zenhanConverter.convert`
- **コマンド名**: 「全角／半角変換」
- **コンテキストメニュー**: `.txt` / `.md` ファイルのときだけ表示
- **ショートカットキー**:
  - Windows / Linux: `Ctrl` + `Alt` + `Shift` + `K`
  - macOS: `Cmd` + `Alt` + `Shift` + `K`

### 設定

各文字種ごとに、次の 3 種類から変換方法を選べます。

- **そのまま**: 変換しない
- **全角**: 対象文字を全角に統一
- **半角**: 対象文字を半角に統一

設定は `zenhanConverter.*` というキー名で、拡張機能の設定画面から変更できます（`settings.json` でも編集可）。主な項目は次の通りです。

- `zenhanConverter.01Alphabet`: アルファベット（A–Z, a–z）
- `zenhanConverter.02Number`: 数字（アラビア数字 0–9）
- `zenhanConverter.03Brackets`: カッコ類（（）［］｛｝「」）
- `zenhanConverter.04Exclamation`: 感嘆符（！）
- `zenhanConverter.05Question`: 疑問符（？）
- `zenhanConverter.06Operators`: 演算子（＋、＝、＜、＞）
- `zenhanConverter.07At`: アットマーク（@）
- `zenhanConverter.08Colon`: コロン（:）
- `zenhanConverter.09Semicolon`: セミコロン（;）
- `zenhanConverter.10Percent`: パーセント（%）
- `zenhanConverter.11Kuten`: 句点（。）、読点（、）  
  - 半角に変換する場合は **JIS X 0201 の半角句読点（｡ / ､）** を使用します。
- `zenhanConverter.12Space`: スペース（全角スペース / 半角スペース）
- `zenhanConverter.13Yen`: 円マーク（￥）  
  - 全角: U+FFE5, 半角: U+00A5
- `zenhanConverter.14Tilde`: チルダ（~）
- `zenhanConverter.15Hyphen`: ハイフン（-）
- `zenhanConverter.16Underscore`: アンダースコア（_）
- `zenhanConverter.17Backslash`: バックスラッシュ（\）  
  - 全角: U+FF3C, 半角: U+005C
- `zenhanConverter.18Slash`: フォワードスラッシュ（/）
- `zenhanConverter.19Ampersand`: アンパサンド（&）
- `zenhanConverter.20Asterisk`: アスタリスク（*）
- `zenhanConverter.21Dollar`: ドル記号（$）
- `zenhanConverter.22Hash`: シャープ（#）
- `zenhanConverter.23SingleQuote`: シングルクォーテーション（'）
- `zenhanConverter.24DoubleQuote`: ダブルクォーテーション（"）
- `zenhanConverter.25PeriodComma`: ピリオド（．）、コンマ（，）
- `zenhanConverter.26Pipe`: パイプ（|）
- `zenhanConverter.27Backquote`: バッククォート（`）
- `zenhanConverter.28Caret`: ハット（^）

#### デフォルト設定

デフォルト値は以下の通りです（一部抜粋）。

- アルファベット: **半角**
- 数字（アラビア数字）: **半角**
- スペース: そのまま
- 感嘆符・疑問符・句読点・各種記号: そのまま

必要に応じて、好みのスタイルに合わせて変更してください。

### 実装メモ

- 変換対象は UTF-16 のコードポイントに基づいて定義されています。
- 全角⇔半角の対応は `src/converter.ts` の `CHAR_MAPPINGS` で管理しています。
- 変換処理は `convertText(text, settings)` に集約されており、エディターの選択範囲ごとに適用されます。

