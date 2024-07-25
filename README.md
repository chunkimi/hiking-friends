# 郊友趣・Hiking Friends


## 線上瀏覽
https://chunkimi.github.io/hiking-friends/

![hiking-friends](https://github.com/chunkimi/hiking-friends/blob/6b90141ee23c202eebf91e3388645ce5e99a53a7/public/images/hikingfriends.jpeg)


## 作品說明與特色
**多樣化主題與關鍵字檢索 × 註冊會員 To-Do List 與 JSON 資料格式轉換結合應用 × 多種個人化圖表分析**

本專案平台提供使用者友善且輕鬆檢索步道資訊，管理個人收藏清單與編輯筆記，並透過圖表分析協助掌握個人化步道健行狀況。

- **檢索的多樣性**：除了基本的關鍵字檢索外，還提供主題檢索方式，讓使用者能夠快速找到符合需求的步道。包括依據不同類型的登山角色、步道難易度、地區、城市、路程、步道系統等進行篩選，提供使用者友善的搜尋方式。
- **資訊整合**：每筆步道提供基本資料，並整合即時最新路況，於單一頁面即可掌握出遊基礎資訊。
- **步道 To-Do List** : 利用常見的 To-Do List 進行變化應用，使用者可將感興趣的步道加入收藏，並通過 JSON 資料格式轉換，將步道任務（即待辦事項）轉化為可進行個人評分和心得筆記的功能。
- **圖表分析**：個人化的完走步道分析，提供六種主題圖表分析包含Line Chart, Bar Chart, Doughnut Chart, Scatter Chart, Radar Chart, Polar Area Chart，呈現使用者的完成率、步道類型、海拔和難易度等資訊。


## 聲明
1. 本專案為個人side project，用於個人前端開發技術訓練，並非商業或營利用途。
3. 專案使用的相關素材來源包括但不限於以下所述資源（詳[數據與素材來源](#數據與素材來源)），盡可能事先確認這些資源可用於非商業用途。若有不慎引用資料而侵犯到您的權利，請與我聯繫，我將立即處理並刪除相關內容。
4. 專案不提供於本地端下載運行，請勿轉載專案內素材資源。
5. 會員功能源自線上課程API（詳[數據與素材來源](#數據與素材來源)），已註冊會員帳號與帳號內資料，每日午夜會自動重置刪除，若要跨日使用請重新註冊。


## 目錄
[聲明](#聲明)｜[開發者](#開發者)｜
[作品說明與特色](#作品說明與特色)｜[平台操作說明](#平台操作說明)
[數據與素材來源](#數據與素材來源)｜[開發工具](#開發工具)｜[資料夾與內容說明](#資料夾與內容說明)


## 平台操作說明
請參考提供給使用者的[使用說明](https://chunkimi.github.io/hiking-friends/#/guide)


## 數據與素材來源
#### API
- 森林步道資訊與路況：農業部林業及自然保育署 open data
- 會員功能：基礎來自線上課程提供學員作業練習使用的to do list API，在本專案前端進行變化和應用

#### 圖像
- 步道與景物照片（包含首頁兩張橫幅底圖、動植物、鐵道火車等）：農業部林業及自然保育署
- 插畫：https://www.linustock.com/
- 評論者人像：https://www.pexels.com/zh-tw/

#### 網站Logo、首頁UI設計稿
- 設計師POKA（透過線上課程平台媒合設計師，付費取得客製化設計）

#### 文字
- 步道分級說明：農業部林業及自然保育署
- 文案：多由本人撰寫，如首頁網站介紹等；部分使用ChatGPT生成或潤飾，如推薦評論文字。


## 開發工具
#### Node.js v18.18.2

#### 主要框架和相關套件
- [VITE](https://vitejs.dev/) 
- [Vue 3](https://vuejs.org/)
- [vue-router](https://router.vuejs.org/)
- [pinia](https://pinia.vuejs.org/)
- [vueuse](https://vueuse.org/)

#### 樣式
- [bootstrap 5](https://getbootstrap.com/)
- [sass](https://sass-lang.com/)

#### 圖表
- [chart.js](https://www.chartjs.org/)

#### 其他
- [axios](https://axios-http.com/)
- [eslint](https://eslint.org/)
- [prettier](https://prettier.io/)


## 資料夾與內容說明
- public - ico 圖片
- src
  - api - 遠端api路徑管理
  - assets - 圖片
  - components - 元件
  - data - 基本資料，如：步道分級、角色說明等
  - router - 前端路由設定
  - stores - 資料全域狀態管理，如：會員帳號與權限、步道清單、收藏步道任務清單等
  - styles - global style 設定、客製化 bootstrap styles、共用的客製化scss等
  - utils - 設定工具、小工具，如：圖片路徑轉換、頁碼、圖表、步道資料篩選、頁面資料讀取設定等
  - views - 畫面


## 開發者
內容企劃、架構與Wireframe、前端：Kimi

