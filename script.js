dt()
const KEY = "出席君カスタム_科目";
const KEY_STYLE = "出席君カスタム_装飾";


const lectureList = $$("form:has(.subject-button)").map(e=>e.textContent);
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

// 現在の時限を返す（いずれでもない時間の時は、0を返す）
function getPeriod(){
  const d = new Date()
  const h = d.getHours()
  const m = d.getMinutes()

  const ranges = [
    { id: "1限目", start: "08:50", end: "10:20" },
    { id: "2限目", start: "10:30", end: "12:00" },
    { id: "3限目", start: "12:50", end: "14:20" },
    { id: "4限目", start: "14:30", end: "16:00" },
    { id: "5限目", start: "16:10", end: "17:40" },
  ];

  // 現在時刻（例：new Date()）
  // const now = new Date("2025 12 1 11:00");
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();

  // HH:MM → 分に変換
  const toMinutes = (timeStr) => {
    const [h, m] = timeStr.split(":").map(Number);
    return h * 60 + m - 5;
  };

  // 判別
  const matched = ranges.find(({ start, end }) => {
    const s = toMinutes(start);
    const e = toMinutes(end);

    // 通常の範囲（例 6:00〜9:00）
    if (s < e) {
      return s <= nowMin && nowMin < e;
    }

    // 跨ぐ範囲（例 23:00〜6:00）
    return nowMin >= s || nowMin < e;
  });
  // console.log(matched?.id || "時間外");
  return matched?.id || 0;
}

// 今日の曜日を返す
function getDay() {
  return "月火水木金"[new Date().getDay() - 1] + "曜日";
}

(async function(){
console.log(getDay(), getPeriod())
  const raw = (await chrome.storage.local.get(KEY))[KEY] ||[];
console.log("KEY:", KEY, ", raw:", raw);
  const [lecture, ..._] = raw.split(/(?<=限目),/)
    .map(e=>e.split(","))
    .filter(([lecture, day, time]) => day == getDay() && time == getPeriod())
    // .map(([lecture, day, time]) => console.log("arrayResult:", lecture, day, time))
    .map(([lecture, day, time]) => lecture);
console.log(lecture)
  const target = $$("form:has(.subject-button)")
    .filter(e=>e.textContent==lecture)[0]
  console.log(target)
  dp(target)
  if(!target) return;
    // .map(e=>e.style.backgroundColor="red");
  // target.style.backgroundColor = "red";
  const raw_style = (await chrome.storage.local.get(KEY_STYLE))[KEY_STYLE] || [];
  console.log("raw_style", raw_style)
  // (async function(){
    raw_style.split(",")
      .map(e => e.split(":"))
      .map(([k, v]) => target.style[k] = v);
  // })();
/*  const t = raw_style.split(",")
    .map(e => e.split(":"))
    .reduce((a, [k, v]) => Object.assign({ [k]: v }, a), {})
  append("body", create("style", ))*/
console.log(t)
})()

