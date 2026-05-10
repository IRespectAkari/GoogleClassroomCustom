
const days = "月火水木金".split("").map(e=>e+"曜日");
const times = range(5, 1).map(i=>i+"限目");
let num = 0;

function addLectureDiv(lecture = "", day = 0, time = 0) {
  num++;
  const baseOption = {
    name: `lectureD`,
    events: {
      change: update
    },
  };
  const inputOption = {
    placeholder: "科目名を入力",
    value: lecture
  };
  const dayOption = { selectedIndex: days.indexOf(day) };
  const timeOption = { selectedIndex: times.indexOf(time) };
  const inputs = [
    create("input", null, Object.assign(inputOption, baseOption)),
    create("select", days.map(Wrap("option")), Object.assign(dayOption, baseOption)),
    create("select", times.map(Wrap("option")), Object.assign(timeOption, baseOption)),
    create("button", "削除", { events: { click: deleteOption } }),
  ];
  const div = create("div", inputs, { className: "lecture" });
  append("#lectures", div);
}
$("button#addLecture").addEventListener("click", ()=>addLectureDiv());
// $("button").addEventListener("click", addLectureDiv);

const KEY = "出席君カスタム_科目";
const KEY_STYLE = "出席君カスタム_装飾";

function deleteOption(e) {
  console.log("deleteOption")
  const div = e.target.closest("div")
  // console.log(div)
  if(window.prompt("削除していいですか？\n削除するなら「ok」と入力してください") == "ok") {
    console.log("delete!")
    div.remove();
    update()
    return;
  }
  console.log("not delete!")
}

function update() {
  const data = $$(".lecture :is(input, select)").map(e=>e.value).join(",");
  console.log(data)
  chrome.storage.local.set({ [KEY]: data });
}

function update_style() {
  // const data = $$(".style :is(input)").map(e=>e.value).join(",");
  const data = $$(".style").map(e => [$(".key", e).value, $(".value", e).value].join(":")).join(",");
  console.log(data)
  chrome.storage.local.set({ [KEY_STYLE]: data });
}

function addStyleDiv(key = "", value = "") {
  const baseOption = {
    name: `styleD`,
    events: {
      change: update_style
    },
  };
  const keyOption = {
    placeholder: "キーを入力",
    value: key,
    className: "key"
  };
  const valueOption = {
    placeholder: "値を入力",
    value: value,
    className: "value"
  };
  const inputs = [
    create("input", null, Object.assign(keyOption, baseOption)),
    create("input", null, Object.assign(valueOption, baseOption)),
    create("button", "削除", { events: { click: deleteOption } }),
  ];
  const div = create("div", inputs, { className: "style" });
  append("#styles", div);
}
$("button#addStyle").addEventListener("click", ()=>addStyleDiv());

// 初期化処理
async function initializer() {
  const raw = await chrome.storage.local.get(null);
  const data = raw[KEY] || "";
  const data_style = raw[KEY_STYLE] || "";

  // console.log(raw);
  // console.log(JSON.stringify(raw, null, "  "));
  if(JSON.stringify(raw, null, "  ") == "{}") console.log("でーたがありません！");
  // "情報数学2,月曜日,1限目,情報数学2,月曜日,1限目,情報数学2,月曜日,1限目"
  //   .split(/(?<=限目),/)
  //   .map(e=>e.split(","))
  //   .map(([lecture, day, time]) => addLectureDiv(lecture, day, time))

  data.split(/(?<=限目),/)
    .map(e=>e.split(","))
    .map(([lecture, day, time]) => addLectureDiv(lecture, day, time))

  data_style.split(",")
    .map(e => e.split(":"))
    .map(([k, v]) => addStyleDiv(k, v))
}
initializer();
