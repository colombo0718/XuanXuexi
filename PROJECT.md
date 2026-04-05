# PROJECT.md — xuanxuexi 專案說明

> 最後更新：2026-04-05  
> 本檔供 Claude（AI）閱讀，了解本專案架構與開發規範。

---

## 1. 專案定位（一段話）

本目錄是 **LeafLune（LL）宇宙** 的核心工作區。LL 宇宙是一個以「Edutainment（寓教於樂）」為核心的生態系，整合 **教育 × 遊戲 × AI × 強化式學習（RL）哲學**，並在此世界觀下同時推進多個品牌和產品線。目前最接近出貨的產品是 **Pinyin Poker 64**（漢語拼音撲克牌），並有完整設計規格的 **Sentence Summoner**（造句對戰遊戲）。

---

## 2. 品牌與平台架構

### 對外三大品牌
| 代號 | 名稱 | 定位 |
|------|------|------|
| XX | 宣學習 XuanXuexi | 教育 / 語言學習 / 課程 |
| LL | LeafLune 葉月育樂 | IP / 情緒價值 / 世界觀 |
| SS | StrategySpace 策略空間 | 競技 / 對戰 / AI 擂台 |

### 對內四大平台
| 代號 | 名稱 | 功能 |
|------|------|------|
| RR | ReinRoom 強化教室 | RL 訓練平台，AI 誕生地 |
| GG | GameGeek 遊戲極客 | 控制器橋接層（人 / AI ↔ 遊戲） |
| MM | MatrixManager 矩陣總管 | 任務 / 專案 / 文件中控台 |
| TT | TreasureToolbox 寶藏工具箱 | 卡牌排版 / 素材生產工廠 |

---

## 3. 目錄結構與關鍵檔案

```
xuanxuexi/
├── Card/                        ← Pinyin Poker 64 網頁原型
│   ├── index.html               ← 拼音卡牌生成器（互動預覽）
│   ├── pinyinPoker64.html       ← 64張牌完整展示
│   ├── pinyinPoker64_download.html ← 附下載功能版本
│   ├── manyMoji.html            ← Emoji 多牌展示
│   ├── create8A4pdf.html        ← A4 PDF 生成工具
│   ├── bear.html                ← 熊版卡牌（變體）
│   ├── test.html                ← 測試頁面
│   ├── pinyinDeck.js            ← 64張牌資料（主版）
│   ├── pinyinDeck_ds.js         ← 64張牌資料（ds 版本）
│   ├── leaflune_emoji.png       ← LL 版 Emoji 圖集
│   ├── xuanxuexi_emoji.png      ← XX 版 Emoji 圖集
│   ├── pp64/                    ← 已生成的 64張 PNG（原版）
│   └── pp64_ll/                 ← 已生成的 64張 PNG（LeafLune 版）
│
├── tocfl-material-gen/          ← TOCFL 教材生成工具（獨立子專案）
│   ├── download_resources.py
│   ├── sample_tests/
│   ├── teacher_examples/
│   └── vocabulary/
│
├── download_neocities_folder.py ← 從 Neocities 下載整個資料夾的工具
├── download-neocities-folder.mjs← 同上（Node.js 版）
├── 新版HSK考试大纲.pdf           ← HSK 3.0 官方大綱（參考資料）
│
├── CLAUDE.md                    ← AI 工作規範（本目錄通用）
├── PROJECT.md                   ← 本檔
└── [多份 .md 規劃文件]           ← 見下方「規劃文件」
```

---

## 4. 規劃文件清單

| 檔名 | 內容 |
|------|------|
| `LL_Universe_MasterPlan_v1.md` | LL 宇宙總藍圖，所有子專案的地圖與索引 |
| `LL生態系架構.md.md` | 五大平台詳細職責與三大閉環（AI / 玩家 / 經濟） |
| `LeafLune Universe 關係架構總覽.md` | 品牌 × 平台 × IP × 商品的層次關係 |
| `宣學習課程地圖架構 v1.0.md` | XX 課程骨架，HSK 1–9 × 情境 × AI 融合 |
| `漢語單詞遊戲卡造句對戰系統 v1.0.md` | Sentence Summoner 完整遊戲設計規格 |
| `LeafLune 卡牌桌遊產品輸出標準 v1.0.md` | 卡牌出版 SOP（PDF 規格、印刷規格、Gumroad 上架流程） |
| `Chinese Flashcard 商業模式規劃.md` | Flashcard MVP 規劃 + 卡片三維分類系統 |
| `LeafLune 宇宙的多維度架構思考.md` | 架構思考補充文 |
| `專案管理 Project Manager.md` | HackMD 各品牌專案連結索引（部分連結待補） |
| `拼音學習卡_牌組規劃*.md` | 拼音卡牌規劃草稿（多版本） |
| `漢語拼音 Emoji 學習卡.md` | 64 張拼音卡 Emoji 選用規劃 |

---

## 5. 核心產品規格

### 5.1 Pinyin Poker 64（最接近出貨）

- **64 張卡牌**，4 個花色 × 16 張：
  - L（聽力・水 💧）、S（口說・火 🔥）、R（閱讀・土 🌱）、W（書寫・風 🌬）
- 每張卡包含：主音（聲母/韻母/聲調符號）、漢字、拼音、Emoji
- 識別碼格式：`[花色][十六進位]`，例如 `L3` = 聽力組第 4 張（g/狗/gǒu/🐶）
- 目前狀態：
  - ✅ 64 張 PNG 圖已生成（`pp64/` 與 `pp64_ll/` 兩版本）
  - ✅ 網頁互動原型完成（`Card/` 下的 HTML 頁面）
  - ⏳ 缺：A4 PDF 輸出、使用說明 PDF、Gumroad 上架

**卡牌標準規格（印刷用）：**
- 成品尺寸：63 × 88 mm（標準撲克牌）
- 出血：四邊各 3 mm（設計尺寸 69 × 94 mm）
- 解析度：300 dpi
- 顏色模式：CMYK
- 輸出格式：PDF（正面 fronts + 背面 back）、PNG（每張獨立）

### 5.2 Sentence Summoner 造句對戰系統（規格完整，待實作）

- 用「造句」打架，漢語程度決定戰力
- 四種主力詞性：
  - **名詞卡**（角色，永久四維 HP/ATK/DEF/SPD）
  - **形容詞卡**（持續 buff/debuff）
  - **副詞卡**（持續行動風格 buff/debuff）
  - **動詞卡**（一回合爆發招式，使用後丟棄）
  - **陷阱卡**（其他詞性，增加造句條件，不加數值）
- 攻擊流程：選角色 → 選動詞卡 → 造句（SVO 結構）→ 計算 ATK → 速度命中判定 → 扣血
- 難度分級：Lv.0（只名詞）→ Lv.1（+動詞）→ Lv.2（+形容詞/副詞）→ Lv.3（+陷阱）
- 模式：PvP（學生 vs 學生）/ PvE（全班 vs 老師 Boss）

### 5.3 Chinese Flashcard（MVP 規劃中）

- 三維分類系統：**難度**（HSK 等級 / 自家 L1–L5）× **領域/場景** × **文法**
- MVP 目標：旅遊主題，機場+飯店，60 個核心單字，英文介面
- 輸出格式：CSV（可匯入 Anki/Quizlet）、Anki 套牌、A4 PDF

---

## 6. 工具腳本

### download_neocities_folder.py / .mjs
從 Neocities 下載整個資料夾，用於備份線上網站檔案。

```bash
# Python 版用法
python download_neocities_folder.py --dir Card --out ./neocities-backup --api-key YOUR_KEY

# 認證方式：--api-key 或 --username + --password，或環境變數 NEOCITIES_API_KEY
```

---

## 7. 開發規範

- **不要動已生成的 PNG 圖片**（`pp64/`、`pp64_ll/`）除非要重新生成整批
- **新卡牌資料修改**：改 `pinyinDeck.js`，再重新生成 PNG
- **卡牌命名規則**：`[花色][十六進位].png`，例如 `L3.png`、`WF.png`
- **兩套品牌**：`pp64/` 是 XuanXuexi 版，`pp64_ll/` 是 LeafLune 版（Emoji 圖集不同）

---

## 8. 待辦大項（跨專案）

- [ ] Pinyin Poker 64：A4 PDF 輸出 + 使用說明 + Gumroad 上架
- [ ] Sentence Summoner：卡牌實體製作（數值設計、美術）
- [ ] Chinese Flashcard MVP：60 個旅遊單字包製作
- [ ] HackMD 專案管理連結補全（`專案管理 Project Manager.md`）
- [ ] `LL_Projects_Index_v1.md` 建立
- [ ] 各品牌 spec 文件（`LL_Brand_XX_spec_v1.md` 等）

---

## 9. 外部資源

- 專案管理（HackMD）：詳見 `專案管理 Project Manager.md`
- 部署平台：Neocities（`download_neocities_folder.py` 用於備份）
- 卡牌上架目標平台：Gumroad
