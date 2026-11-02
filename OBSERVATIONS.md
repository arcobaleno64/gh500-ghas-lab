# 實測紀錄

欄位說明：**學習站說法**（章節與原句）、**實際觀察**（附日期與做法）、**結果**（一致／不一致／無法測試）。

| 實驗 | 學習站說法 | 來源 | 實際觀察 | 結果 |
| ---- | ---------- | ---- | -------- | ---- |
| 0 | 公開 repository 的 secret scanning 自動啟用 | d2.md | | |
| 0 | Dependabot alerts 預設不啟用 | d1.md | | |
| 1 | 命令列推送含 partner pattern 的 secret 會被阻擋 | d2.md | | |
| 1 | 「I'll fix it later」產生開啟中的警示 | d2.md | | |
| 1 | 「It's used in tests」產生已關閉的警示 | d2.md | | |
| 2 | 警示在 dependency graph 改變或 advisory 新增時產生 | d3.md | | |
| 2 | Security update 更新到包含修補的最低版本 | d3.md | | |
| 2 | 合併 security update pull request 會關閉警示 | d3.md | | |
| 2 | 「Dismiss low impact issues…」在公開 repository 預設啟用 | d3.md | | |
| 2 | Version updates 預設有 3 天 cooldown | d3.md | | |
| 3 | dependency review action 預設發現有弱點的套件就失敗 | d3.md | | |
| 3 | allow-licenses 與 deny-licenses 只能擇一 | d3.md | | |
| 4 | default setup 預設用 default query suite | d4.md | | |
| 4 | error、critical、high 嚴重度使 pull request 檢查失敗 | d4.md | | |
| 4 | security-and-quality 只能用於 advanced setup | d4.md | | |
| 4 | 警示頁面狀態只反映預設分支 | d4.md | | |
| 4 | 公開 repository 可用 Copilot Autofix | d4.md | | |
| 5 | Export SBOM 為 SPDX 格式，不含 dependents | d3.md | | |
| 5 | 產生 SBOM 的 REST 呼叫：202 輪詢，302 下載 | d3.md | | |
