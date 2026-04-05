# CHANGELOG.md — 里程碑與架構決策紀錄

---

## 2026-04-05

### 文件體系建立
- 建立 `CLAUDE.md`（AI 協作規範）、`PROJECT.md`（專案架構說明）、`README.md`、`TODO.md`、`CHANGELOG.md`
- 明確規範 Gemini / Codex 分工原則與 PROJECT.md 更新 SOP

---

## 2026-04-04

### Pinyin Poker 64 卡牌圖完成
- `Card/pp64/`：64 張 XuanXuexi 版 PNG 生成完畢
- `Card/pp64_ll/`：64 張 LeafLune 版 PNG 生成完畢
- 網頁原型完成（`index.html`、`pinyinPoker64.html`、`manyMoji.html` 等）
- 從 Neocities 備份至本地（`download_neocities_folder.py`）

---

## 2026-03-29

### TOCFL 教材生成工具
- `tocfl-material-gen/` 建立，含 `download_resources.py` 與範例素材

---

## 2026-03-25

### LL 宇宙規劃文件定稿
- `LL_Universe_MasterPlan_v1.md`：宇宙總藍圖 v1
- `LL生態系架構.md`：五大平台架構與三大閉環
- `LeafLune Universe 關係架構總覽.md`：品牌 × 平台 × IP × 商品層次
- `宣學習課程地圖架構 v1.0.md`：HSK 3.0 課程骨架
- `漢語單詞遊戲卡造句對戰系統 v1.0.md`：Sentence Summoner 完整規格
- `LeafLune 卡牌桌遊產品輸出標準 v1.0.md`：卡牌出版 SOP
- `Chinese Flashcard 商業模式規劃.md`：Flashcard MVP 與三維分類系統

---

## 架構決策紀錄

### 卡牌規格採用標準撲克牌尺寸（63 × 88 mm）
決策原因：市場通用規格，印刷廠備有標準模具，成本最低，使用者熟悉。

### 64 張分成 L/S/R/W 四花色各 16 張
決策原因：對應漢語學習四大技能（聽/說/讀/寫），十六進位識別碼（0–F）天然對應，視覺分類清晰。

### 卡牌資料分為兩套（pinyinDeck.js / pinyinDeck_ds.js）
決策原因：兩套 Emoji 圖集（xuanxuexi_emoji.png vs leaflune_emoji.png），對應不同品牌輸出需求。

### Sentence Summoner 數值只用加減法 + d6 骰子
決策原因：目標用戶是學生，運算要夠簡單；只用 d6 降低道具門檻。
