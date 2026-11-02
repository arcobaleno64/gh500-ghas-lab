# 實驗

每個實驗的格式：**目標** → **步驟** → **預期觀察**（取自學習站的說法）→ **記錄**（寫進 `OBSERVATIONS.md`，標明一致或不一致）。

預期觀察是「待驗證的說法」，不是已知事實。實際看到的與預期不同時，以實際為準，並回頭修正學習站。

## 實驗 0：確認起點

1. 在 repository 的 Settings 找到 **Security and quality → Advanced Security**，截圖或抄下每個功能目前的狀態（secret scanning、push protection、Dependabot alerts、security updates、code scanning）。
2. 預期：公開 repository 的 secret scanning 自動啟用；Dependabot alerts 預設不啟用。
3. 記錄每一項的實際狀態。

## 實驗 1：Secret scanning 與 push protection（D2）

**目標：** 親眼看到 push protection 阻擋推送，並比較三個繞過理由產生的警示狀態。

**步驟：**
1. 在官方的「Supported secret scanning patterns」頁面找一個格式公開的 partner pattern，構造一個格式相符、但**明顯不是真憑證**的測試字串。找不到安全的字串就跳過本實驗，不要用真的。
2. 確認 push protection 已啟用，從命令列推送含該字串的 commit。
3. 觀察推送是否被阻擋、訊息說了什麼。
4. 在被阻擋的畫面依序用三個理由各繞過一次（各用不同的測試字串）：It's used in tests、It's a false positive、I'll fix it later。
5. 到 Security and quality 看三個警示的狀態。

**預期觀察：** 命令列推送被阻擋；繞過後前兩個警示為已關閉（原因分別是 used in tests 與 false positive），I'll fix it later 產生開啟中的警示；繞過事件進入稽核日誌（公開 repository 的稽核日誌可能看不到，記錄你看到什麼）。

**額外：** 在網頁介面編輯檔案並提交含測試字串的內容，確認也會被阻擋。

## 實驗 2：Dependabot（D3）

**目標：** 看到警示、security update、grouped、auto-triage 與 cooldown 的實際行為。

**步驟：**
1. 啟用 Dependabot alerts。`app/package.json` 的 `lodash 4.17.15` 是已知有弱點的版本。
2. 觀察警示何時出現、內容（嚴重度、修復版本、受影響檔案）。
3. 啟用 Dependabot security updates，觀察 Dependabot 開的 pull request：更新到哪個版本？是否為「包含修補的最低版本」？合併後警示是否關閉？
4. 在 Settings 找 auto-triage 規則，確認「Dismiss low impact issues for development-scoped dependencies」是否預設啟用、「Dismiss package malware alerts」是否預設停用。
5. 新增 `.github/dependabot.yml` 啟用 npm 的 version updates，並設定 `cooldown`；比較預設與自訂 cooldown 下 pull request 出現的時機。
6. 記錄新增相依性後，警示是由「dependency graph 改變」觸發的。

**預期觀察：** 警示出現在 Security and quality 頁籤；security update 更新到最低修補版本；auto-triage 預設值如上；version updates 預設有 3 天 cooldown，security updates 不受影響。

## 實驗 3：Dependency review（D3、D5）

**目標：** 在引入前攔下有弱點的相依性，並測試設定選項。

**步驟：**
1. 開一個分支，在 `app/package.json` 加入一個有已知弱點的舊版套件，開 pull request。
2. 觀察 Files changed 頁籤的 dependency review，以及 `Dependency Review` workflow 是否失敗。
3. 把 `fail-on-severity` 改成 `critical`，同一個 pull request 重跑，比較結果。
4. 同時設定 `allow-licenses` 與 `deny-licenses`，觀察 workflow 的反應（預期：只能擇一）。
5. 建立 branch ruleset，要求 `dependency-review` 狀態檢查通過才能合併。公開 repository 的 repository 層級 ruleset 與組織層級 Require workflows 不同，記錄你能設定哪一種。

**預期觀察：** 預設發現有弱點的套件就失敗；`allow-licenses` 與 `deny-licenses` 同時使用會出錯。

## 實驗 4：Code scanning（D4）

**目標：** 比較 default 與 advanced setup，操作警示分流與合併保護。

**步驟：**
1. 啟用 code scanning default setup，記錄它自動選了哪些語言與哪個 query suite。
2. 觀察哪些事件觸發了掃描（啟用時、push、pull request）。
3. 找到對 `app/server.js` 的 `eval` 的警示，記錄 severity 與 security severity，點 Show paths。
4. 到 tool status page，記錄顯示的狀態與各語言的檔案涵蓋率。
5. 開一個 pull request 引入新的有問題程式碼，觀察 `Code scanning results` 檢查是否失敗（預期：高嚴重度使檢查失敗）。
6. 建立 ruleset，加入 Require code scanning results，設定嚴重度門檻，確認會阻擋合併。
7. 試著在警示上按 Generate fix（Copilot Autofix），記錄是否可用、產生什麼。
8. 用三種原因各關閉一個警示（若有多個警示），並重新開啟其中一個。
9. 切換到 advanced setup（Switch to advanced → Disable CodeQL），編輯 workflow，把 query suite 改成 `security-and-quality`，記錄警示數量差異。

**預期觀察：** default setup 預設用 default suite；`security-and-quality` 只能用於 advanced setup；警示頁面狀態只反映預設分支。

## 實驗 5：SBOM 與其他（D3）

**步驟：**
1. 在 Insights → Dependency graph 按 Export SBOM，開啟檔案，確認格式是 SPDX，並檢查內容是否包含 dependents。
2. 閱讀 REST API 文件找出產生 SBOM 的端點，用 `gh api` 呼叫，記錄回應狀態碼（預期：產生中為 202，完成後 302 重新導向）。
3. 在 dependency graph 展開一個間接相依性的 Show paths。

## 完成後

把 `OBSERVATIONS.md` 中「不一致」的項目整理成清單，回到學習站 repository 修正對應章節，並在 commit 訊息註明「由實驗 N 驗證」。
