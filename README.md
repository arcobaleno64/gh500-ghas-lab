# gh500-ghas-lab

GH-500（GitHub Advanced Security）的實作練習 repo，對應姊妹專案 [gh-600-agentic-ai-study-guide](https://github.com/arcobaleno64/gh-600-agentic-ai-study-guide) 的 GH-500 學習內容。

> **警告：這個 repository 故意包含有弱點的程式碼與過期的相依性，只用來練習 GitHub 安全功能。不要部署它，也不要複製進正式專案。**

## 目的

學習站的內容是讀官方文件後整理的。這裡把其中「頁面這麼說」的句子拿到真實的 repository 上執行一次，記錄實際行為，找出文件與實際不一致的地方。

## 為什麼是公開 repository

公開 repository 可免費使用 secret scanning、push protection、code scanning、Dependabot 與 dependency review。付費組織層級的功能（security configurations、security campaigns、delegated bypass 與 dismissal、security manager、global settings）**不在本 repo 範圍內**。

## 結構

| 路徑 | 內容 |
| ---- | ---- |
| `LABS.md` | 五個實驗：步驟、預期觀察、驗證方式 |
| `OBSERVATIONS.md` | 實測紀錄表：學習站的說法 vs 實際觀察 |
| `app/` | 故意有問題的小型 Node 應用程式（有過期相依性與可被 CodeQL 偵測的程式碼） |
| `.github/workflows/` | 練習用 workflow |

## 安全規則

1. **永遠不要放入真實的憑證。** 實驗 1 會教你如何找出「會觸發偵測、又不是真憑證」的測試字串；找不到就跳過該步驟，不要用真的。
2. 不要把有弱點的 `app/` 部署到任何地方。
3. 練習完成後可停用 Dependabot 與 code scanning，或直接封存這個 repository。
