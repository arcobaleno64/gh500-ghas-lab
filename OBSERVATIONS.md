# 實測紀錄

欄位說明：**學習站說法**（章節與原句）、**實際觀察**（附日期與做法）、**結果**（一致／不一致／無法測試）。

| 實驗 | 學習站說法 | 來源 | 實際觀察 | 結果 |
| ---- | ---------- | ---- | -------- | ---- |
| 0 | 公開 repository 的 secret scanning 自動啟用 | d2.md | 2026-11-02：新建公開 repo 後，API 的 security_and_analysis 顯示 secret_scanning 為 enabled（建立後未做任何設定） | 一致 |
| 0 | Dependabot alerts 預設不啟用 | d1.md | 2026-11-02：GET vulnerability-alerts 回 404，dependabot/alerts 回 403「Dependabot alerts are disabled for this repository」；dependabot_security_updates 為 disabled | 一致 |
| 0 | （學習站未寫）新建公開 repo 的 push protection 預設狀態 | — | 2026-11-02：secret_scanning_push_protection 為 enabled，未做任何設定。不確定是 repo 預設、帳號層級設定，還是公開 repo 的預設行為 | 學習站未涵蓋，需補或標註 |
| 0 | （學習站未寫）新建公開 repo 的 non-provider patterns 與 validity checks 預設 | — | 2026-11-02：兩者皆 disabled | 學習站未涵蓋 |
| 0 | （學習站未寫）code scanning default setup 預設 | — | 2026-11-02：default-setup state 為 not-configured | 學習站未涵蓋 |
| 1 | 命令列推送含 partner pattern 的 secret 會被阻擋 | d2.md | | |
| 1 | 「I'll fix it later」產生開啟中的警示 | d2.md | | |
| 1 | 「It's used in tests」產生已關閉的警示 | d2.md | | |
| 2 | 警示在 dependency graph 改變或 advisory 新增時產生 | d3.md | 2026-11-02：啟用 Dependabot alerts 後約 90 秒內出現 6 則 lodash 警示（修復版本分別為 4.17.19、4.17.21、4.17.23、4.18.0）；本次是啟用功能後既有 manifest 被掃描，未能分辨「advisory 新增」與「graph 改變」 | 無法測試該區分 |
| 2 | Security update 更新到包含修補的最低版本 | d3.md | 2026-11-02：6 則警示中最高的 first_patched_version 為 4.18.0（npm 上存在），但 Dependabot 開的 PR #1 把 lodash 從 4.17.15 升到 **4.18.1**（也是 npm latest） | **不一致或需解釋**：不是已確認的最低修補版本 4.18.0；原因不明（可能是 Dependabot 避開 4.18.0 的某個狀況，沒有查證） |
| 2 | 合併 security update pull request 會關閉警示 | d3.md | | |
| 2 | 「Dismiss low impact issues…」在公開 repository 預設啟用 | d3.md | | |
| 2 | Version updates 預設有 3 天 cooldown | d3.md | | |
| 3 | dependency review action 預設發現有弱點的套件就失敗 | d3.md | 2026-11-02：PR #2 加入 minimist@1.2.0（critical，GHSA-xvch-5gv4-984h）；workflow 失敗，訊息「Dependency review detected vulnerable packages」。注意：我的 workflow 設了 fail-on-severity: high，所以這次不能單獨證明「預設」行為 | 部分一致（在 high 門檻下失敗；未測無門檻的預設） |
| 3 | allow-licenses 與 deny-licenses 只能擇一 | d3.md | 2026-11-02：同時設 allow-licenses: MIT 與 deny-licenses: GPL-3.0，workflow 失敗，錯誤訊息「You cannot specify both allow-licenses and deny-licenses」 | 一致 |
| 4 | default setup 預設用 default query suite | d4.md | 2026-11-02：啟用時我指定了 query_suite=default；API 回傳 default、weekly 排程 | 未測（是我指定的，沒測「自動選擇」） |
| 4 | default setup 自動選擇語言 | d4.md | 2026-11-02：自動選了 actions、javascript、javascript-typescript、typescript（含 GitHub Actions workflows） | 一致 |
| 4 | CodeQL 在首次掃描後偵測可被偵測的弱點 | d4.md | 2026-11-02：1 則 js/code-injection，severity=error、security severity=critical；`res.send` 的 XSS 沒有警示 | 一致（eval 被偵測）；XSS 在 default suite 下未被標出 |
| 4 | error、critical、high 嚴重度使 pull request 檢查失敗 | d4.md | | |
| 4 | security-and-quality 只能用於 advanced setup | d4.md | | |
| 4 | 警示頁面狀態只反映預設分支 | d4.md | | |
| 4 | 公開 repository 可用 Copilot Autofix | d4.md | | |
| 5 | Export SBOM 為 SPDX 格式，不含 dependents | d3.md | 2026-11-02：REST 取得的 SBOM spdxVersion 為 SPDX-2.3，packages 5 個（express、lodash 與 2 個 Actions、repo 本身）；未開啟介面匯出的檔案，也未檢查是否含 dependents | 部分一致（格式 SPDX 一致；dependents 未測） |
| 5 | 產生 SBOM 的 REST 呼叫：202 輪詢，302 下載 | d3.md | 2026-11-02：generate-report 回 201 與 sbom_url；對 sbom_url 輪詢三次皆立即回 302（導向 blob 儲存體），沒有看到 202（小型 repo 可能立即完成） | 部分一致（302 一致；202 未出現，不能證明或否定） |
