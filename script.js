const normalise = value => String(value || "").toLowerCase().replace(/[^a-z0-9#.%]+/g, " ").trim();
const includesAny = (value, accepted) => accepted.some(a => normalise(value).includes(normalise(a)));

const quizData = {
  "l1-rapid": [
    ["Which continent is Nigeria in?", ["africa"]],
    ["Which ocean / gulf is on its coast?", ["gulf of guinea", "atlantic"]],
    ["Give two neighbouring countries.", ["benin+niger", "benin+chad", "benin+cameroon", "niger+chad", "niger+cameroon", "chad+cameroon"], "twoCountries"],
    ["About how many people live in Nigeria?", ["220 million", "220m", "about 220"]],
    ["What year did Nigeria become independent?", ["1960"]],
    ["Name Nigeria’s film industry.", ["nollywood"]],
    ["Give one reason Nigeria is important globally.", ["oil", "opec", "largest economy", "population", "market", "regional power"]]
  ],
  "l2-rapid": [
    ["What are imports?", ["goods bought", "bought in", "brought in", "from other countries"]],
    ["What are exports?", ["goods sold", "sold to", "other countries"]],
    ["What is a trade surplus?", ["exports more than imports", "exports worth more", "positive trade balance"]],
    ["Which country sells the most goods to Nigeria?", ["china"]],
    ["Which country gives the most aid to Nigeria?", ["usa", "united states", "america"]],
    ["What is Nigeria’s HDI rank?", ["161", "161st"]],
    ["What is Nigeria’s life expectancy?", ["55.2", "55"]]
  ],
  "l2-trade": [
    ["Calculate Nigeria’s trade balance. Show working.", ["3.2", "+3.2", "surplus"], "tradeBalance"]
  ],
  "l3-rapid": [
    ["Give one positive impact of rapid development in Nigeria.", ["gdp", "tech", "services", "rail", "school", "enrolment", "investment", "jobs"]],
    ["Give one negative environmental impact of rapid development.", ["oil spill", "deforestation", "waste", "pollution"]],
    ["What percentage of Nigeria’s petroleum does Shell produce?", ["21", "over 21"]],
    ["What does MOSOP stand for?", ["movement for the survival of the ogoni people", "ogoni"]],
    ["Name one top-down project.", ["dangote", "refinery", "lagos light rail", "light rail"]],
    ["Name one bottom-up project.", ["farmcrowdy", "lifebank"]]
  ]
};

const tableData = {
  "l1-core": [
    ["Main core region of Nigeria", ["south", "the south"]],
    ["Most important core city", ["lagos"]],
    ["Second core area", ["abuja"]],
    ["One periphery feature", ["poor roads", "weak electricity", "fewer services", "hospitals", "schools", "weaker infrastructure"]],
    ["Main reason the South is richer", ["oil", "port", "investment", "ports"]],
    ["Process that moves people to the core", ["rural urban migration", "rural-urban migration", "migration"]]
  ]
};

const sortData = {
  "l1-sector": {
    options:["Retail and wholesale","Oil extraction","ICT research","Banking","Fishing","Refining oil","Healthcare","Teaching","Mining","Car assembly","University research","Film editing software"],
    categories:["Primary","Secondary","Tertiary","Quaternary"],
    answers:{"Retail and wholesale":"Tertiary","Oil extraction":"Primary","ICT research":"Quaternary","Banking":"Tertiary","Fishing":"Primary","Refining oil":"Secondary","Healthcare":"Tertiary","Teaching":"Tertiary","Mining":"Primary","Car assembly":"Secondary","University research":"Quaternary","Film editing software":"Quaternary"}
  },
  "l2-geopolitics": {
    options:["Lake Chad water disputes","Nigeria leads ECOWAS","Boko Haram insurgency","USA provides military training","Bakassi Peninsula dispute","China supplies military hardware","Maritime boundary dispute","Nigeria sends troops to Liberia and Sierra Leone"],
    categories:["Conflict / dispute","Cooperation / alliance"],
    answers:{"Lake Chad water disputes":"Conflict / dispute","Nigeria leads ECOWAS":"Cooperation / alliance","Boko Haram insurgency":"Conflict / dispute","USA provides military training":"Cooperation / alliance","Bakassi Peninsula dispute":"Conflict / dispute","China supplies military hardware":"Cooperation / alliance","Maritime boundary dispute":"Conflict / dispute","Nigeria sends troops to Liberia and Sierra Leone":"Cooperation / alliance"}
  },
  "l3-impacts": {
    options:["Makoko informal settlement housing 100,000+ people","GDP about $440bn","Lagos tech hub attracting investment","Oil spills in the Niger Delta","Lagos–Kano railway","Over 450,000 hectares of forest lost annually","84% primary school enrolment","10,000 tonnes of waste daily"],
    categories:["Positive","Negative"],
    answers:{"Makoko informal settlement housing 100,000+ people":"Negative","GDP about $440bn":"Positive","Lagos tech hub attracting investment":"Positive","Oil spills in the Niger Delta":"Negative","Lagos–Kano railway":"Positive","Over 450,000 hectares of forest lost annually":"Negative","84% primary school enrolment":"Positive","10,000 tonnes of waste daily":"Negative"}
  }
};

const gapData = {
  "l2-tech": {
    text: ["By 2023, mobile penetration in Nigeria had reached ", 0, ", showing there were more connections than people. About ", 1, " of the country had internet access. Mobile banking platforms such as ", 2, " help transactions. E-learning through ", 3, " reaches remote places. Social media campaigns such as ", 4, " show how technology can support civic action."],
    options:["","119%","40%","Paga","#EndSARS","Ulesson"],
    answers:["119%","40%","Paga","Ulesson","#EndSARS"]
  }
};

const strategyAnswers = {
  "Dangote Oil Refinery": {type:"Top-down", benefit:["jobs","reduces fuel imports","imports"], limitation:["pollution","displacement"]},
  "Lagos Light Rail": {type:"Top-down", benefit:["congestion","travel"], limitation:["budget","overrun","disruption"]},
  "Farmcrowdy": {type:"Bottom-up", benefit:["farmers","investors","rural livelihoods"], limitation:["digital divide","access"]},
  "Lifebank": {type:"Bottom-up", benefit:["blood","oxygen","saving lives","lives"], limitation:["cost","limited reach"]}
};

const menuItems = [
  ["lesson1","L1 Do now","Rapid recall on location, population, oil, independence and global importance."],
  ["lesson1","L1 Short writing","Short 2- and 3-mark location and importance questions using precise facts."],
  ["lesson1","L1 Core/periphery table","Compare Lagos, Abuja and northern periphery regions."],
  ["lesson1","L1 Sector sort","Sort jobs and industries into economic sectors."],
  ["lesson2","L2 Data skills","Read trade data and complete calculation and explanation tasks."],
  ["lesson2","L2 Geopolitics sort","Classify examples as cooperation, alliance, conflict or dispute."],
  ["lesson2","L2 Technology gap fill","Complete a fact-rich ICT and connectivity paragraph."],
  ["lesson3","L3 Rapid development sort","Sort social, economic and environmental impacts."],
  ["lesson3","L3 Top-down v bottom-up","Compare Dangote, Lifebank, Farmcrowdy and Lagos Light Rail."],
  ["exam","Final exam practice","Plan and write realistic 3-, 4- and 8-mark answers."]
];

function specialCheck(value, type){
  const v = normalise(value);
  if(type === "twoCountries"){
    const countries = ["benin","niger","chad","cameroon"].filter(c => v.includes(c));
    return countries.length >= 2;
  }
  if(type === "tradeBalance") return v.includes("3.2") || (v.includes("55.6") && v.includes("52.4") && v.includes("surplus"));
  return false;
}

function renderMenu(){
  const grid = document.getElementById("menuGrid");
  grid.innerHTML = menuItems.map(([target,title,desc]) => `<a class="menu-item" href="#${target}"><strong>${title}</strong><span>${desc}</span></a>`).join("");
}
function renderQuizzes(){
  Object.entries(quizData).forEach(([id, rows]) => {
    const el = document.querySelector(`[data-quiz="${id}"]`);
    if(!el) return;
    el.innerHTML = rows.map((row,i)=>`<div class="quiz-row"><div class="question">${i+1}. ${row[0]}</div><input class="input" data-answer-id="${id}" data-index="${i}" type="text" autocomplete="off"></div>`).join("");
  });
}
function renderTables(){
  Object.entries(tableData).forEach(([id, rows]) => {
    const el = document.querySelector(`[data-table="${id}"]`);
    el.innerHTML = rows.map((row,i)=>`<div class="table-row"><div class="question">${row[0]}</div><input class="input" data-answer-id="${id}" data-index="${i}" type="text"></div>`).join("");
  });
}
function renderSorts(){
  Object.entries(sortData).forEach(([id, data]) => {
    const el = document.querySelector(`[data-sort="${id}"]`);
    el.innerHTML = data.options.map((option,i)=>`<div class="sort-row"><div class="question">${option}</div><select data-answer-id="${id}" data-option="${option}"><option value="">Choose...</option>${data.categories.map(c=>`<option>${c}</option>`).join("")}</select></div>`).join("");
  });
}
function renderGaps(){
  Object.entries(gapData).forEach(([id, data]) => {
    const el = document.querySelector(`[data-gap="${id}"]`);
    el.innerHTML = data.text.map(part => typeof part === "number" ? `<select data-answer-id="${id}" data-index="${part}">${data.options.map(o=>`<option>${o}</option>`).join("")}</select>` : part).join("");
  });
}
function renderStrategies(){
  const el = document.querySelector(`[data-strategy="l3-strategies"]`);
  el.innerHTML = Object.keys(strategyAnswers).map(project => `<div class="strategy-row"><strong>${project}</strong><select data-project="${project}" data-field="type"><option value="">Type...</option><option>Top-down</option><option>Bottom-up</option></select><input class="input" data-project="${project}" data-field="benefit" placeholder="One benefit"><input class="input" data-project="${project}" data-field="limitation" placeholder="One limitation"></div>`).join("");
}

function markInputs(id, rows){
  let correct = 0;
  rows.forEach((row,i)=>{
    const input = document.querySelector(`[data-answer-id="${id}"][data-index="${i}"]`);
    const ok = row[2] ? specialCheck(input.value,row[2]) : includesAny(input.value,row[1]);
    input.classList.toggle("correct", ok); input.classList.toggle("incorrect", !ok && input.value.trim());
    if(ok) correct++;
  });
  showFeedback(id, correct, rows.length);
}
function markSort(id){
  const data = sortData[id]; let correct = 0;
  data.options.forEach(option=>{
    const select = document.querySelector(`[data-answer-id="${id}"][data-option="${CSS.escape(option)}"]`);
    const ok = select.value === data.answers[option];
    select.classList.toggle("correct", ok); select.classList.toggle("incorrect", !ok && select.value);
    if(ok) correct++;
  });
  showFeedback(id, correct, data.options.length);
}
function markGap(id){
  const data = gapData[id]; let correct = 0;
  data.answers.forEach((answer,i)=>{
    const select = document.querySelector(`[data-answer-id="${id}"][data-index="${i}"]`);
    const ok = select.value === answer;
    select.classList.toggle("correct", ok); select.classList.toggle("incorrect", !ok && select.value);
    if(ok) correct++;
  });
  showFeedback(id, correct, data.answers.length);
}
function markStrategy(){
  let correct = 0, total = 0;
  Object.entries(strategyAnswers).forEach(([project, answer])=>{
    ["type","benefit","limitation"].forEach(field=>{
      total++;
      const input = document.querySelector(`[data-project="${CSS.escape(project)}"][data-field="${field}"]`);
      const ok = field === "type" ? input.value === answer.type : includesAny(input.value, answer[field]);
      input.classList.toggle("correct", ok); input.classList.toggle("incorrect", !ok && input.value);
      if(ok) correct++;
    });
  });
  showFeedback("l3-strategies", correct, total);
}
function showFeedback(id, correct, total){
  const box = document.getElementById(`feedback-${id}`); if(!box) return;
  box.style.display = "block";
  box.className = `feedback ${correct === total ? "good" : "bad"}`;
  box.textContent = correct === total ? `Excellent: ${correct}/${total} correct.` : `${correct}/${total} correct. Fix the highlighted answers, then check again.`;
  scores[id] = {correct,total}; saveScores(); updateScore();
}
function showAnswers(id){
  if(quizData[id]) quizData[id].forEach((row,i)=>{const input=document.querySelector(`[data-answer-id="${id}"][data-index="${i}"]`); input.value = row[2] === "twoCountries" ? "Benin and Cameroon" : row[2] === "tradeBalance" ? "+$3.2bn trade surplus" : row[1][0];});
  if(tableData[id]) tableData[id].forEach((row,i)=>{document.querySelector(`[data-answer-id="${id}"][data-index="${i}"]`).value = row[1][0];});
  if(sortData[id]) sortData[id].options.forEach(option=>{document.querySelector(`[data-answer-id="${id}"][data-option="${CSS.escape(option)}"]`).value = sortData[id].answers[option];});
  if(gapData[id]) gapData[id].answers.forEach((answer,i)=>{document.querySelector(`[data-answer-id="${id}"][data-index="${i}"]`).value = answer;});
  if(id === "l3-strategies") Object.entries(strategyAnswers).forEach(([project, answer])=>{
    document.querySelector(`[data-project="${CSS.escape(project)}"][data-field="type"]`).value = answer.type;
    document.querySelector(`[data-project="${CSS.escape(project)}"][data-field="benefit"]`).value = answer.benefit[0];
    document.querySelector(`[data-project="${CSS.escape(project)}"][data-field="limitation"]`).value = answer.limitation[0];
  });
}

let scores = JSON.parse(localStorage.getItem("nigeriaRevisionScores") || "{}");
function saveScores(){ localStorage.setItem("nigeriaRevisionScores", JSON.stringify(scores)); }
function updateScore(){
  const totals = Object.values(scores).reduce((acc,s)=>{acc.c += s.correct; acc.t += s.total; return acc;},{c:0,t:0});
  document.getElementById("score-total").textContent = `${totals.c} / ${totals.t}`;
}
function wireEvents(){
  document.querySelectorAll(".check-btn").forEach(btn=>btn.addEventListener("click",()=>{
    const id = btn.dataset.check;
    if(quizData[id]) markInputs(id, quizData[id]);
    else if(tableData[id]) markInputs(id, tableData[id]);
    else if(sortData[id]) markSort(id);
    else if(gapData[id]) markGap(id);
    else if(id === "l3-strategies") markStrategy();
  }));
  document.querySelectorAll(".show-btn").forEach(btn=>btn.addEventListener("click",()=>showAnswers(btn.dataset.show)));
  document.querySelectorAll(".reveal-markscheme").forEach(btn=>btn.addEventListener("click",()=>{
    const box = btn.nextElementSibling; box.classList.toggle("visible"); btn.textContent = box.classList.contains("visible") ? "Hide mark scheme" : "Show mark scheme";
  }));
  document.getElementById("resetBtn").addEventListener("click",()=>{
    if(!confirm("Reset all saved scores and typed answers on this device?")) return;
    localStorage.removeItem("nigeriaRevisionScores"); scores={}; updateScore();
    document.querySelectorAll("input, textarea").forEach(i=>i.value="");
    document.querySelectorAll("select").forEach(s=>s.selectedIndex=0);
    document.querySelectorAll(".correct,.incorrect").forEach(el=>el.classList.remove("correct","incorrect"));
    document.querySelectorAll(".feedback").forEach(el=>el.style.display="none");
  });
}

renderMenu(); renderQuizzes(); renderTables(); renderSorts(); renderGaps(); renderStrategies(); wireEvents(); updateScore();
