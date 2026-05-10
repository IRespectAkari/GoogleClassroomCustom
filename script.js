
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
const src = `2026年度　1年生 (新2年生) 基礎ゼミ・演習の募集
2026_R0804zenki_cc_KiZm_基礎ゼミ_ITエンジニア
R8情報処理技術演習1(iﾊﾟｽ対策)【水・3限・NW必修】
R8[前期・水曜日・1時限]　ビジネスプログラミング　（プラマンタ）
2026前、初級韓国語
2026_統計学入門
2026_R0804zenki_c05fri03_NwApp_ネットワークアプリケーション構築
2026_経営情報学Ⅰ
2026_情報数学Ⅱ
2026_データベース論
2026_特別実習・講義（情報）アプリ共同開発実践
2026プログラミング実践I
2026年　法学
経済学2026
Webシステム
2026_R0804zenki_c04thu03_KiZE_ITエンジニア合同
政治学　令和7（2025）年度後期 　月曜２限目
2025_インターンシップ実習`.split("\n");

const dst = `基礎ゼミ・演習の募集
基礎ゼミ・演習
情報処理技術演習1(iﾊﾟｽ対策)
ビジネスプログラミング
初級韓国語
統計学入門
ネットワークアプリケーション構築
経営情報学Ⅰ
情報数学Ⅱ
データベース論
アプリ共同開発実践
プログラミング実践I
法学
経済学
Webシステム
基礎ゼミ
政治学_2025
インターンシップ実習`.split("\n");

const convert = str => dst[src.indexOf(str)]

function update(e) {
  console.log("update by GCcuctom!")
  $$(`div[aria-label="登録科目"] > a:not([aria-label="ToDo"])`)
  .map(e=>$("div:nth-child(3) > div", e))
  .map(e=>[e, e.textContent])
  .map(([e, txt]) => {
    e.textContent = convert(txt);
    // e.append(create("input", null, { type: "text", value: txt, events: {change: update } }));
    return e;
  })
  $$(`div[aria-label="登録科目"] > a:not([aria-label="ToDo"])`)
    .map(e=>$("div:nth-child(3) > div:nth-child(2)", e))
    .filter(Boolean)
    .map(e=>e.remove())
}

(async function(){
  // const raw = (await chrome.storage.local.get(KEY))[KEY] || [];
  document.body.append(create("button", "変更", { style: {position:"fixed",top:"100px",right:"50px",zIndex:"10000"}, events: {click: update}}))
  return;
console.log("aiueo")
  $$(`div[aria-label="登録科目"] > a:not([aria-label="ToDo"])`)
    .map(e=>$("div:nth-child(3) > div", e))
    .map(e=>e.textContent = "")

  $$(`div[aria-label="登録科目"] > a:not([aria-label="ToDo"])`)
    .map(e=>$("div:nth-child(3) > div", e))
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

