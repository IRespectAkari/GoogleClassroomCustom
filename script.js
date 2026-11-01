
// const indentify = a.href.match(/(?<=file\/d\/).+(?=\/)/)[0]
// const downloadLink = `https://drive.usercontent.google.com/u/0/uc?id=${indentify}&export=download`

const KEY = ``;
// console.log(lectureList);

const default_lectureTimeMap = {
  "R8_前期_ITエンジニア_基礎ゼミ": "木3",
  "経済学": "金2",
  "ネットワークアプリケーション構築": "金3",
  "アプリ共同開発実践　前期": "火1",
  "データベース論": "火4",
  "スイッチング技術": "火5",
  "R8_前期_ビジネスプログラミング": "水1",
  "R8_前期_情報処理技術演習1": "水3",
  "経営情報学Ⅰ": "水4",
  "情報数学Ⅱ": "水5",
  "2026プログラミング実践I": "月45",
};

const data = {
  // 2年後期
  "2026_データモデリング": "データモデリング",
  "2026_統計プログラミング": "統計プログラミング",
  "2026_R0810kouki_c03wed04_OS_オペレーティングシステム論": "オペレーティングシステム論",
  "2026_Routing": "ルーティング技術",
  "R8[後期水曜1時限] 人工知能 (プラマンタ)": "人工知能",
  "2026_経営情報学Ⅱ": "経営情報学Ⅱ",
  "2026後期、中級韓国語": "中級韓国語",
  "R8[後期月曜4時限と5時限] プログラミング　実践 II (プラマンタ)": "プログラミング実践 II",
  "2026_統計学": "統計学",
  "2026_R0810kouki_c05fri03_NwApp_ネットワークアプリケーション構築": "後期_ネットワークアプリケーション構築",
  "2026_R0810kouki_c04thu03_KiZE_ITエンジニア合同": "基礎ゼミ_後期",
  "2026_R0810kouki_cc_KiZm_基礎ゼミ_ITエンジニア": "基礎ゼミ_ITエンジニア",
  "R08(2026)年度アルゴリズムとデータ構造": "アルゴリズムとデータ構造",
  "Moodle構築プロジェクト": "Moodle構築プロジェクト",

  // 2年前期？
  "2026_Switch": "スイッチング技術",
  "2026年度　1年生 (新2年生) 基礎ゼミ・演習の募集": "基礎ゼミ・演習の募集",
  "2026_R0804zenki_cc_KiZm_基礎ゼミ_ITエンジニア": "基礎ゼミ・演習",
  "R8情報処理技術演習1(iﾊﾟｽ対策)【水・3限・NW必修】": "情報処理技術演習1(iﾊﾟｽ対策)",
  "R8[前期・水曜日・1時限]　ビジネスプログラミング　（プラマンタ）": "ビジネスプログラミング",
  "2026前、初級韓国語": "初級韓国語",
  "2026_統計学入門": "統計学入門",
  "2026_R0804zenki_c05fri03_NwApp_ネットワークアプリケーション構築": "前期_ネットワークアプリケーション構築",
  "2026_経営情報学Ⅰ": "経営情報学Ⅰ",
  "2026_情報数学Ⅱ": "情報数学Ⅱ",
  "2026_データベース論": "データベース論",
  "2026_特別実習・講義（情報）アプリ共同開発実践": "アプリ共同開発実践",
  "2026プログラミング実践I": "プログラミング実践I",
  "2026年　法学": "法学",
  "経済学2026": "経済学",
  "Webシステム": "Webシステム",
  "2026_R0804zenki_c04thu03_KiZE_ITエンジニア合同": "基礎ゼミ_前期",
  "政治学　令和7（2025）年度後期 　月曜２限目": "政治学_2025",
  "2025_インターンシップ実習": "インターンシップ実習",

  // ？
  "モバイルネットワーク": "モバイルネットワーク",
};

function update(e) {
  console.log("update by GCcuctom!")
  $$(`div[aria-label="登録科目"] > a:not([aria-label="ToDo"])`)
    .map(e=>$("&> div:last-child div:first-child", e))
    .map(e=>[e, e.textContent])
    .map(([e, txt]) => {
      e.textContent = data[txt];

      if(e.parentNode.childElementCount != 1){
        e.parentNode.lastChild.remove();
      }
      return e;
    })
}

(async function(){
  // const raw = (await chrome.storage.local.get(KEY))[KEY] || [];
  document.body.append(create("button", "変更", {
    style: {position:"fixed",top:"100px",right:"50px",zIndex:"10000",width: "8em", height: "4em"},
    events: {click: update}}))
  return;
})();



// ↓以下無効化中 ---------------------------------------------------
/*
(async function(){
console.log("aiueo")
  $$(`div[aria-label="登録科目"] > a:not([aria-label="ToDo"])`)
    .map(e=>$("&> div:last-child div:first-child", e))
    // .map(e=>$("div:nth-child(3) > div", e))
    .map(e=>e.textContent = "")

  $$(`div[aria-label="登録科目"] > a:not([aria-label="ToDo"])`)
    .map(e=>$("&> div:last-child div:first-child", e))
    // .map(e=>$("div:nth-child(3) > div", e))
    .map(e=>[e, e.textContent])
    .map(([e, txt]) => {
      e.textContent = "";
      e.append(create("input", null, { type: "text", value: txt, events: {change: update } }));
      return e;
    })

  return;


  console.log("KEY:", KEY, ", raw:", raw);
  const [lecture, ..._] = raw.split(/(?<=限目),/)
    .map(e=>e.split(","))
    .filter(([lecture, day, time]) => day == getDay() && time == getPeriod())
    // .map(([lecture, day, time]) => console.log("arrayResult:", lecture, day, time))
    .map(([lecture, day, time]) => lecture);

  const target = $$("form:has(.subject-button)")
    .filter(e=>e.textContent==lecture)[0]
  if(!target) return;
})()

*/
