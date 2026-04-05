# TODO.md — 待辦事項

---

## Pinyin Poker 64

- [ ] 生成 A4 彩色列印版 PDF（`create8A4pdf.html` 已有雛形，確認輸出品質）
- [ ] 製作使用說明 PDF（列印方式、剪裁建議、基本玩法、授權條款）
- [ ] 打包為 zip 並上架 Gumroad
  > 需等 PDF + 說明書都完成
- [ ] 撰寫 Gumroad 商品頁文案（中/英）
- [ ] 確認 `pp64_ll/`（LeafLune 版）與 `pp64/`（XuanXuexi 版）差異，決定是否分開上架
- [ ] 製作印刷廠用 CMYK 300dpi PDF（`fronts_300dpi_CMYK.pdf` + `back_300dpi_CMYK.pdf`）
  > 待數位版先上架驗證需求後再做

---

## Sentence Summoner 造句對戰

- [ ] 名詞卡數值設計（HP/ATK/DEF/SPD，依 HSK 等級調整）
- [ ] 動詞卡、形容詞卡、副詞卡數值設計
- [ ] 陷阱卡句型條件清單
- [ ] 卡牌美術設計（版面、配色、圖示）
- [ ] 製作試玩版（最小可玩套組，名詞 10 張 + 動詞 10 張）
  > 先做 Lv.1，確認玩法後再做 Lv.2

---

## Chinese Flashcard MVP

- [ ] 確定 60 個旅遊主題單字（機場 + 飯店）
- [ ] 補充 meaning_en 與短例句（中 + 英）
- [ ] 補上標記欄位（hsk_level、domain、scene、pos）
- [ ] 匯出 CSV 與 Anki 套牌
- [ ] 排版 A4 PDF 單字表
- [ ] 上架 Gumroad / 分享連結測試

---

## 宣學習官網

- [ ] 建立 GitHub repo，串接 Cloudflare Pages 自動部署
- [ ] 規劃頁面結構（首頁 / 課程 / 周邊產品 / 關於）
- [ ] 設計稿：色系、字型、Logo 使用規範（基於 xuanxuexi_emoji.png）
- [ ] 實作首頁 HTML/CSS（Hero、品牌介紹、課程預覽區）
- [ ] 建立 `courses.js` 課程資料檔，頁面從資料自動渲染卡片
  > 未來新增課程只改資料，不動 HTML
- [ ] 建立 `products.js` 周邊產品資料檔（同上原則）
- [ ] 課程列表頁：從 `courses.js` 自動生成課程卡片
- [ ] 周邊產品頁：連結至 Gumroad 各商品
- [ ] RWD（手機版）調整
- [ ] 建立第一個示範單元（HSK1，旅遊情境）
  > 待官網骨架完成後
- [ ] 設計點數回饋機制原型
  > 擱置，待課程平台需求明確後再做

---

## 專案管理與文件

- [ ] 補全 `專案管理 Project Manager.md` 中的 HackMD 連結
- [ ] 建立 `LL_Projects_Index_v1.md`（各品牌專案一頁式說明書）
- [ ] 撰寫各品牌 spec 文件（`LL_Brand_XX_spec_v1.md` 等）
- [ ] 建立 `LL_SOP_Template_v1.md`

---

## 擱置

- **RR / GG / SS 技術平台實作**：概念藍圖完整，但需要更多技術資源，暫緩。
- **LL 幣經濟系統**：需要平台基礎建設先到位才有意義。
- **TOCFL 教材生成**（`tocfl-material-gen/`）：功能完整但目前非主力，暫不擴充。
