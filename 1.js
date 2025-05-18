<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>手機成癮問卷</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
    .hidden { display: none; }
    .question { margin-bottom: 15px; }
    button { padding: 10px 20px; font-size: 16px; }
  </style>
</head>
<body>

  <div id="page1">
    <p id="intro"></p>
    <button onclick="goToPage(2)">開始測驗</button>
  </div>

  <div id="page2" class="hidden">
    <form id="survey">
      <div class="question">
        <label>1. 每天使用手機多久?(小時)<br><input type="number" name="q1" required></label>
      </div>

      <div class="question">
        <label>2. 你通常什麼時間使用手機最多？<br>
          <select name="q2" required>
            <option value="早上上課前">早上上課前</option>
            <option value="在校時">在校時</option>
            <option value="放學後">放學後</option>
            <option value="睡前">睡前</option>
          </select>
        </label>
      </div>

      <div class="question">
        <label>3. 手機不在身邊時會感到焦慮嗎？<br>
          <select name="q3" required>
            <option value="非常同意">非常同意</option>
            <option value="同意">同意</option>
            <option value="普通">普通</option>
            <option value="不同意">不同意</option>
            <option value="非常不同意">非常不同意</option>
          </select>
        </label>
      </div>

      <div class="question">
        <label>4. 你是否曾因手機影響學業?<br>
          <select name="q4" required>
            <option value="經常">經常</option>
            <option value="偶爾">偶爾</option>
            <option value="很少">很少</option>
            <option value="不曾有過">不曾有過</option>
          </select>
        </label>
      </div>

      <div class="question">
        <label>5-1. 你是否曾嘗試減少手機使用時間？<br>
          <select name="q5_1" required>
            <option value="有">有</option>
            <option value="沒有">沒有</option>
          </select>
        </label>
      </div>

      <div class="question">
        <label>5-2. 使用哪些方法？<br><input type="text" name="q5_2"></label>
      </div>

      <div class="question">
        <label>6. 你願意為了更好的生活品質減少手機使用嗎?<br>
          <select name="q6" required>
            <option value="願意">願意</option>
            <option value="不願意">不願意</option>
          </select>
        </label>
      </div>

      <div class="question">
        <label>7. 你平均每天打開社群媒體幾次？<br><input type="number" name="q7" required></label>
      </div>

      <div class="question">
        <label>8. 你是否因手機錯過與人面對面互動的機會？<br>
          <select name="q8" required>
            <option value="經常">經常</option>
            <option value="偶爾">偶爾</option>
            <option value="很少">很少</option>
            <option value="不曾有過">不曾有過</option>
          </select>
        </label>
      </div>

      <button type="submit">送出</button>
    </form>
  </div>

  <div id="page3" class="hidden">
    <h2>分析結果</h2>
    <p id="result"></p>
    <div id="advice"></div>
    <p>成果回復表單：<a href="https://docs.google.com/forms/d/1sqcPoZJXkR_KYz0138DXeqZZE96tGJeRhw3-NbY9bG4/edit" target="_blank">點此前往</a></p>
  </div>

  <script>
    const introText = "您是否有手機成癮的問題，這份問卷能為你評斷您是否成癮，並給予一些改善的意見，如果您想改變現狀就來試試吧!";
    const punctuations = /[，。！？、,!?]/g;
    document.getElementById("intro").innerHTML = introText.replace(punctuations, match => match + '<br>');

    function goToPage(page) {
      document.getElementById("page1").classList.add("hidden");
      document.getElementById("page2").classList.add("hidden");
      document.getElementById("page3").classList.add("hidden");
      document.getElementById("page" + page).classList.remove("hidden");
    }

    document.getElementById("survey").addEventListener("submit", function(e) {
      e.preventDefault();
      const data = new FormData(e.target);

      const usageTime = parseFloat(data.get("q1"));
      const anxiety = data.get("q3");
      const schoolImpact = data.get("q4");
      const triedReduce = data.get("q5_1");
      const willingChange = data.get("q6");
      const openSocial = parseInt(data.get("q7"));
      const missInteraction = data.get("q8");

      let score = 0;

      if (usageTime >= 6) score += 2;
      else if (usageTime >= 4) score += 1;

      if (anxiety === "非常同意") score += 2;
      else if (anxiety === "同意") score += 1;

      if (schoolImpact === "經常") score += 2;
      else if (schoolImpact === "偶爾") score += 1;

      if (triedReduce === "沒有") score += 1;

      if (willingChange === "不願意") score += 1;

      if (openSocial >= 20) score += 2;
      else if (openSocial >= 10) score += 1;

      if (missInteraction === "經常") score += 2;
      else if (missInteraction === "偶爾") score += 1;

      let result = "";
      let advice = "";

      if (score >= 9) {
        result = "您是：重度使用者（上癮且無調整動機）";
        advice = "您顯示出高度手機依賴，且改變意願低。建議開始記錄每日使用時數並設定強制限制時間，必要時諮詢心理輔導。";
      } else if (score >= 7) {
        result = "您是：高使用但有改變動機者";
        advice = `您具有明顯的使用傾向，但願意改變是關鍵優勢。請參考改善建議影片：<br><a href="https://www.youtube.com/watch?v=mCEjEkgU1AA" target="_blank">改善方法影片</a>`;
      } else if (score >= 4) {
        result = "您是：中度依賴者（特定功能或情境才用手機）";
        advice = "您的使用集中在特定情境，建議將這些情境加以規劃，例如預先安排社群使用時段。";
      } else {
        result = "您是：正常使用者（低使用且無負面影響）";
        advice = "恭喜您維持了良好的手機使用習慣，請繼續保持並鼓勵他人也加入行列。";
      }

      document.getElementById("result").innerText = result;
      document.getElementById("advice").innerHTML = advice;
      goToPage(3);
    });
  </script>
</body>
</html>
