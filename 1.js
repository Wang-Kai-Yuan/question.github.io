<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>手機成癮問卷</title>
  <style>
    * {
      box-sizing: border-box;
    }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      background: #f0f4f8;
      color: #333;
    }
    .container {
      max-width: 700px;
      margin: auto;
      padding: 20px;
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      margin-top: 40px;
    }
    h1, h2 {
      text-align: center;
      color: #2c3e50;
    }
    p {
      line-height: 1.6;
    }
    .hidden {
      display: none;
    }
    .question {
      margin-bottom: 20px;
    }
    label {
      display: block;
      font-weight: bold;
      margin-bottom: 5px;
    }
    input[type="number"], input[type="text"], select {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 6px;
    }
    button {
      display: block;
      margin: 20px auto;
      padding: 12px 24px;
      font-size: 16px;
      background-color: #3498db;
      color: #fff;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.3s;
    }
    button:hover {
      background-color: #2980b9;
    }
    a {
      color: #2980b9;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    @media print {
      body * {
        visibility: hidden;
      }
      #page3, #page3 * {
        visibility: visible;
      }
      #page3 {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div id="page1">
      <h1>手機成癮自我評估問卷</h1>
      <p id="intro"></p>
      <button onclick="goToPage(2)">開始測驗</button>
    </div>

    <div id="page2" class="hidden">
      <h2>問卷調查</h2>
      <form id="survey">
        <div class="question">
          <label for="q1">1. 每天使用手機多久？(小時)</label>
          <input type="number" name="q1" min="0" step="0.1" required>
        </div>
        <div class="question">
          <label for="q2">2. 你通常什麼時間使用手機最多？</label>
          <select name="q2" required>
            <option value="">請選擇</option>
            <option value="早上上課前">早上上課前</option>
            <option value="在校時">在校時</option>
            <option value="放學後">放學後</option>
            <option value="睡前">睡前</option>
          </select>
        </div>
        <div class="question">
          <label for="q3">3. 手機不在身邊時會感到焦慮嗎？</label>
          <select name="q3" required>
            <option value="非常同意">非常同意</option>
            <option value="同意">同意</option>
            <option value="普通">普通</option>
            <option value="不同意">不同意</option>
            <option value="非常不同意">非常不同意</option>
          </select>
        </div>
        <div class="question">
          <label for="q4">4. 你是否曾因手機影響學業？</label>
          <select name="q4" required>
            <option value="經常">經常</option>
            <option value="偶爾">偶爾</option>
            <option value="很少">很少</option>
            <option value="不曾有過">不曾有過</option>
          </select>
        </div>
        <div class="question">
          <label for="q5_1">5-1. 你是否曾嘗試減少手機使用時間？</label>
          <select name="q5_1" required>
            <option value="有">有</option>
            <option value="沒有">沒有</option>
          </select>
        </div>
        <div class="question">
          <label for="q5_2">5-2. 使用哪些方法？</label>
          <input type="text" name="q5_2">
        </div>
        <div class="question">
          <label for="q6">6. 你願意為了更好的生活品質減少手機使用嗎？</label>
          <select name="q6" required>
            <option value="願意">願意</option>
            <option value="不願意">不願意</option>
          </select>
        </div>
        <div class="question">
          <label for="q9_1">9-1. 您最常使用手機的第一個功能？</label>
          <input type="text" name="q9_1" required placeholder="例如：社群媒體、遊戲、影音等">
        </div>
        <div class="question">
          <label for="q9_2">9-2. 您最常使用手機的第二個功能？</label>
          <input type="text" name="q9_2" required placeholder="例如：社群媒體、遊戲、影音等">
        </div>
        <button onclick=gotopage(3)>送出</button>
      </form>
    </div>

      <div id="page3" class="hidden">
      <h2>分析結果</h2>
      <p id="result"></p>
      <div id="advice"></div>
      <button onclick="window.print()">列印結果</button>
      <p>成果回復表單：<a href="https://docs.google.com/forms/d/1sqcPoZJXkR_KYz0138DXeqZZE96tGJeRhw3-NbY9bG4/edit" target="_blank">點此前往</a></p>
    </div>
  </div>

  <script>
    const introText = "您是否有手機成癮的問題，這份問卷能為你評斷您是否成癮，並給予一些改善的意見，如果您想改變現狀就來試試吧!";
    const punctuations = /[，。！？、,!?]/g;
    document.getElementById("intro").innerHTML = introText.replace(punctuations, match => match + '<br>');

    function goToPage(page) {
      for (let i = 1; i <= 3; i++) {
        document.getElementById("page" + i).classList.add("hidden");
      }
      document.getElementById("page" + page).classList.remove("hidden");
    }

    document.getElementById("survey").addEventListener("submit", function(e) {
      e.preventDefault();
      const data = new FormData(e.target);
      const usage = parseFloat(data.get("q1"));
      const anxiety = data.get("q3");
      const impact = data.get("q4");
      const motivation = data.get("q6") === "願意";
      const function1 = data.get("q9_1").toLowerCase();
      const function2 = data.get("q9_2").toLowerCase();

      // 判斷功能是否為高浪費類型
      const wastefulKeywords = ["社群", "遊戲", "短影音", "抖音", "instagram", "facebook", "reels"];
      const isWasteful = f => wastefulKeywords.some(w => f.includes(w));
      const wastefulFunctions = [function1, function2].filter(isWasteful);

      // 分類使用者型態
          if (usage > 6 && (motivation === false || triedReduce === false)) {
      type = "重度使用者（上癮且無調整動機）";
    } else if (usage > 5 && (motivation === true || triedReduce === true)) {
      type = "高使用但有改變動機者";
    } else if (
      (anxiety === "非常同意" || anxiety === "同意" || impact === "經常" || impact === "偶爾") 
      && usage > 3
    ) {
      type = "中度依賴者（特定功能或情境才用手機）";
    } else {
      type = "正常使用者（低使用且無負面影響）";
    }

      // 建立減少計畫（18 週），拋物線型減少
      const target = 21; // 每週21小時
      const start = usage * 7; // 每週使用時間
      const weeks = 18;
      const plan = [];
      for (let i = 1; i <= weeks; i++) {
        const t = i / weeks;
        const time = start - (start - target) * Math.pow(t, 1.8);
        plan.push(`第${i}週：建議總使用時間為 ${time.toFixed(1)} 小時`);
      }

      let resultText = `您被歸類為：<strong>${type}</strong><br><br>`;
      if (wastefulFunctions.length > 0) {
        resultText += `您最常使用的功能中，有 <strong>${wastefulFunctions.join("、")}</strong> 可能導致時間浪費，建議優先減少這些用途。<br><br>`;
      } else {
        resultText += `您的使用功能目前未顯示顯著浪費傾向，但仍可檢視是否有優化空間。<br><br>`;
      }

      document.getElementById("result").innerHTML = resultText;
      document.getElementById("advice").innerHTML = `
        <h3>建議減少計畫：</h3>
        <ul>${plan.map(p => `<li>${p}</li>`).join("")}</ul>
        ${motivation ? `<p>您有改變的動機，建議參考 <a href='https://www.youtube.com/watch?v=mCEjEkgU1AA' target='_blank'>這部影片</a> 作為行動參考。</p>` : ""}
      `;

      goToPage(3);
    });
  </script>
</body>
</html>
