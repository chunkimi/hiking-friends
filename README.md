# 郊友趣・Hiking Friends


## 網站瀏覽
https://kathyhu91.github.io/hiking-friends/


## 作品說明與特色
結合自然步道資訊與會員功能的平台，讓使用者可以輕鬆瀏覽和檢索步道資訊，以及收藏管理個人步道收藏清單，提供個人化體驗。

* 步道資訊瀏覽與即時路況：查看各個自然步道的基本資料，獲取目前路況，確保行程安排。
* 步道資料檢索：提供主題分類、關鍵字搜索功能，快速找到符合自己需求的步道資訊。
* 會員功能：使用者可以註冊成為會員，將感興趣的步道加入收藏，製作專屬步道任務護照，便於管理和規劃步道探險。
* 步道護照：提供會員記錄步道的完成情況，撰寫個人評分與心得筆記。
* 完走步道分析：提供個人化的完走步道分析功能，利用圖表呈現使用者的完成率、步道類型、海拔、難易度等資訊，幫助使用者全面了解自己的步道挑戰狀況。
![image-index](https://hackmd.io/_uploads/HkH6_IHOA.png)


## 聲明
1. 本專案為個人side project，用於個人前端開發技術訓練，並非商業或營利用途。
3. 專案使用的相關素材來源包括但不限於以下所述資源（詳[數據與素材來源](#數據與素材來源)），盡可能事先確認這些資源可用於非商業用途。若有不慎引用資料而侵犯到您的權利，請與我聯繫，我將立即處理並刪除相關內容。
4. 專案不提供於本地端下載運行，請勿轉載專案內素材資源。
5. 會員功能源自線上課程API（詳[數據與素材來源](#數據與素材來源)），已註冊會員帳號與帳號內資料，每日午夜會自動重置刪除，若要跨日使用請重新註冊。



## 目錄
[聲明](#聲明)｜[開發者](#開發者)
[作品說明](#作品說明)｜[使用方法](#使用方法)
[數據與素材來源](#數據與素材來源)｜[開發工具](#開發工具)｜[資料夾與放置內容說明](#資料夾與放置內容說明)



## 使用方法
[探索步道](#探索步道)｜[主題分級](#主題分級)｜[郊友護照](#郊友護照)｜[步道任務](#步道任務)｜｜[足跡分析](#足跡分析)

### 探索步道
- 關鍵字檢索： 快速搜尋適合的步道。
- 步道資訊詳細說明： 包含基本資料、路線長度、海拔、難易度、位置等，並即時報告當前路況。
![image-trailsList](https://hackmd.io/_uploads/SJ5mtIrdR.png)

### 主題分級
- 依據預設情境快速檢索步道： 提供三種主題角色「輕鬆踏青」、「鍛鍊健行」和「探險挑戰」，讓使用者依照自身狀況找到合適的步道。
- 分類探索： 依照地區、步道系統及時程等篩選步道。
- 步道難易度分級說明： 根據林業與自然保育署的分級標準，提供步道難易度的詳細說明，便於使用者選擇適合的步道。
![image-role](https://hackmd.io/_uploads/BkLfuUBO0.png)
![image-typeSearch](https://hackmd.io/_uploads/Skt7O8Hd0.png)

### 郊友護照
- 需先**註冊會員**。
- 個人步道任務：將喜愛的步道加入，建立步道待訪清單。
- 瀏覽步道任務執行情況。
![image-progress](https://hackmd.io/_uploads/HJRKIUBO0.png)

#### 步道任務
- 瀏覽與編輯筆記：管理個人步道任務，包括是否已完成、評分與心得撰寫。
- 視覺化進度狀態：使用圖示、進度條與顏色，區分步道任務當前狀態。
![image-taskList](https://hackmd.io/_uploads/r1t3wUBd0.png)

#### 足跡分析
- 個人化數據分析，透過視覺化圖表掌握步道探險的進度與狀態。
- **山岳稜線圖**：根據已完成步道的海拔繪製個人化山岳樣貌。
- **執行情況**：包括收藏完成度、累積公里數等統計。
- **探險數據揭密**：分析已完成步道的長度、海拔、難易度及位置資訊。
![image-myMountain](https://hackmd.io/_uploads/BkHd88HdA.png)
![image-analysis](https://hackmd.io/_uploads/r1QiULrOA.png)


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
- 文案：多由本人撰寫，如首頁網站介紹等；部分使用ChatGPT，如推薦評論文字。


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

