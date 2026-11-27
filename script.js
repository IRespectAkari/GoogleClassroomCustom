(() => {
  const data = {
    // 2年後期
    "2026_データモデリング": "データモデリング",
    "2026_統計プログラミング": "統計プログラミング",
    "2026_R0810kouki_c03wed04_OS_オペレーティングシステム論": "オペレーティングシステム論",
    "2026_Routing": "ルーティング技術",
    "R8[後期水曜1時限] 人工知能 (プラマンタ)": "人工知能",
    "R8[後期月曜4時限と5時限] プログラミング　実践 II (プラマンタ)": "プログラミング実践2",
    "2026_経営情報学Ⅱ": "経営情報学Ⅱ",
    "2026後期、中級韓国語": "中級韓国語",
    "R8[後期月曜4時限と5時限] プログラミング 実践 II (プラマンタ)": "プログラミング実践 II",
    "2026_統計学": "統計学",
    "2026_R0810kouki_c05fri03_NwApp_ネットワークアプリケーション構築": "後期_ネットワークアプリケーション構築",
    "2026_R0810kouki_c04thu03_KiZE_ITエンジニア合同": "基礎ゼミ_後期",
    "2026_R0810kouki_cc_KiZm_基礎ゼミ_ITエンジニア": "基礎ゼミ_ITエンジニア",
    "R08(2026)年度アルゴリズムとデータ構造": "アルゴリズムとデータ構造",
    "Moodle構築プロジェクト": "Moodle構築プロジェクト",

    // 2年前期？
    "2026_Switch": "スイッチング技術",
    "2026年度 1年生 (新2年生) 基礎ゼミ・演習の募集": "基礎ゼミ・演習の募集",
    "2026_R0804zenki_cc_KiZm_基礎ゼミ_ITエンジニア": "基礎ゼミ・演習",
    "R8情報処理技術演習1(iﾊﾟｽ対策)【水・3限・NW必修】": "情報処理技術演習1(iﾊﾟｽ対策)",
    "R8[前期・水曜日・1時限] ビジネスプログラミング （プラマンタ）": "ビジネスプログラミング",
    "2026前、初級韓国語": "初級韓国語",
    "2026_統計学入門": "統計学入門",
    "2026_R0804zenki_c05fri03_NwApp_ネットワークアプリケーション構築": "前期_ネットワークアプリケーション構築",
    "2026_経営情報学Ⅰ": "経営情報学Ⅰ",
    "2026_情報数学Ⅱ": "情報数学Ⅱ",
    "2026_データベース論": "データベース論",
    "2026_特別実習・講義（情報）アプリ共同開発実践": "アプリ共同開発実践",
    "2026プログラミング実践I": "プログラミング実践I",
    "2026年 法学": "法学",
    "経済学2026": "経済学",
    "Webシステム": "Webシステム",
    "2026_R0804zenki_c04thu03_KiZE_ITエンジニア合同": "基礎ゼミ_前期",
    "政治学 令和7（2025）年度後期  月曜２限目": "政治学_2025",
    "2025_インターンシップ実習": "インターンシップ実習",

    // ？
    "モバイルネットワーク": "モバイルネットワーク",
  };

  const cleanStream = () => {
    const items = document.querySelectorAll('div[data-stream-item-id]:has(div[role="link"])');
    const spans = [...items].flatMap((e) => [...e.querySelectorAll("span")]);

    spans.forEach((e) => {
      // if (e.dataset.renamed === "1") return;
      if (!e.textContent.includes("さんが新しい")) return;

      const next = e.textContent.replace(/.+さんが新しい(.+)を投稿しました/, "$1");
      if (next !== e.textContent) {
        e.textContent = next;
        // e.dataset.renamed = "1";
      }
    });
  };

  const updateCourses = () => {
    const links = document.querySelectorAll('[aria-label="登録科目"] > a:not([aria-label="ToDo"])');

    links.forEach((link) => {
      const target = link.querySelector("& > div:last-child div:first-child");
      if (!target || target.dataset.courseUpdated === "1") return;

      const txt = target.textContent.trim();
      if (!Object.prototype.hasOwnProperty.call(data, txt)) return;

      target.textContent = data[txt];
      // target.dataset.courseUpdated = "1";

      if (target.parentNode && target.parentNode.childElementCount !== 1) {
        target.parentNode.lastElementChild?.remove();
      }
    });
  };

  const runAll = () => {
    cleanStream();
    updateCourses();
  };

  runAll();
  setInterval(runAll, 500);
})();
