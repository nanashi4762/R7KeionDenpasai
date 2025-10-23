const bands = [
  {
    name: "LOOO",
    songs: ["インフェルノ", "花火", "ロマンチシズム", "ふっかつのじゅもん"],
    image: "./アー写/[LOOO].jpg"
  },
  {
    name: "羊のすべて",
    songs: ["burning", "more than world", "若者のすべて"],
    image: "./アー写/羊のすべて.jpg"
  },
  {
    name: "109",
    songs: ["???"],
    image: "./アー写/109.jpg"
  },
  {
    name: "ピザ屋の彼女",
    songs: ["本能", "幕ノ内サディスティック", "群青日和", "NIPPON"],
    image: "./アー写/ピザ屋の彼女.jpg"
  },
  {
    name: "フレア",
    songs: ["東京", "人として", "ないものねだり"],
    image: "./アー写/フレア.jpg"
  },
  {
    name: "ガラパゴスチキン",
    songs: ["夢灯籠", "サイハテアイニ", "My sweet baby", "キミシダイ列車"],
    image: "./アー写/ガラパゴスチキン.jpg"
  },
  {
    name: "ペルシャン",
    songs: ["邦画", "チューリップ", "abcdc", "名前は片思い", "夏夜のマジック"],
    image: "./アー写/ペルシャン.jpg"
  },
  {
    name: "花椰菜",
    songs: ["花になって", "キャラクター", "Shout Baby", "恥ずかしいか青春は", "Mela!"],
    image: "./アー写/花椰菜.jpg"
  },
  {
    name: "Morning Glory",
    songs: ["Acquiesce", "Supersonic", "Stand By Me", "Wonderwall", "Don't Look Back In Anger", "Whatever"],
    image: "./アー写/MorningGlory.jpg"
  },
  {
    name: "Coronation Ceremony",
    songs: ["Vinyl", "Sorrows", "白日", "雨燦々", "Teenager Forever"],
    image: "./アー写/CoronationCeremony.jpg"
  },
  {
    name: "ダサい古着屋さん",
    songs: ["ハッピーウエディング前ソング", "すこ。", "かわE", "無線LANばり便利", "あつまれ!パーティーピーポー"],
    image: "./アー写/ダサい古着屋さん.jpg"
  }
];

let currentIndex = 0;
let isAnimating = false;
let autoplayInterval = null;
let isPlaying = true; // 自動再生中かどうか
let progressBar = document.querySelector(".progress");
let progressTimer = null;

function updateBand() {
  const band = bands[currentIndex];
  document.getElementById("band-image").src = band.image;
  document.getElementById("band-name").textContent = band.name;
  document.getElementById("song-title").innerHTML = band.songs.join("<br>");
}

document.addEventListener("DOMContentLoaded", () => {
  // 初期表示
  updateBand();

  // 自動再生
  startAutoPlay();

  // ボタン操作
  document.querySelector(".arrow.left").addEventListener("click", () => {
    slideImage("left");
  });

  document.querySelector(".arrow.right").addEventListener("click", () => {
    slideImage("right");
  });
});
``

function startAutoPlay() {
  autoPlayInterval = setInterval(() => {
    slideImage("right");
  }, 10000);

  //　再生バーの更新
  progressBar.style.width = "0%";
  let startTime = Date.now();
  progressTimer = setInterval(() => {
    let elapsed = Date.now() - startTime;
    let progress = Math.min((elapsed / 10000) * 100, 100);
    progressBar.style.width = progress + "%";
  },50);

  const icon = document.querySelector(".play-pause i");
  icon.classList.remove("fa-play");
  icon.classList.add("fa-pause");

  isPlaying = true;
}

function stopAutoPlay() {
  clearInterval(autoPlayInterval);
  clearInterval(progressTimer);
  
  const icon = document.querySelector(".play-pause i");
  icon.classList.remove("fa-pause");
  icon.classList.add("fa-play");
  isPlaying = false;
}

function togglePlayPause() {
  if (isPlaying) {
    stopAutoPlay();
  } else {
    startAutoPlay();
  }
}

function slideImage(direction) {
    if (isAnimating) return;
    isAnimating = true;

    const image = document.getElementById("band-image");

    // スライドアウト
    image.classList.remove("active");
    image.classList.add(direction === "left" ? "slide-out-right" : "slide-out-left");

    setTimeout(() => {
        // インデックス更新
        currentIndex = (direction === "left")
          ? (currentIndex - 1 + bands.length) % bands.length
          : (currentIndex + 1) % bands.length;

        // テキストは即座に更新
        const band = bands[currentIndex];
        document.getElementById("band-name").textContent = band.name;
        document.getElementById("song-title").innerHTML = band.songs.join("<br>");

    // 画像を更新してスライドイン（希望通りの方向）
    image.src = band.image;

    progressBar.style.width = "0%";

    if(isPlaying) {
      clearInterval(progressTimer);
      let startTime = Date.now();
      progressTimer = setInterval(() => {
        let elapsed = Date.now() - startTime;
        let progress = Math.min((elapsed / 10000) * 100, 100);
        progressBar.style.width = progress + "%";
      },50);
    }

    image.classList.remove("slide-out-left", "slide-out-right");
    image.classList.remove("slide-in-left", "slide-in-right");

    setTimeout(() => {
      image.classList.add(direction === "left" ? "slide-in-left" : "slide-in-right");
      setTimeout(() => {
        image.classList.remove("slide-in-left", "slide-in-right");
        image.classList.add("active");
        isAnimating = false;
      },400);
    }, 10);
  }, 400);
}

document.querySelector(".arrow.left").addEventListener("click", () => {
  slideImage("left");
});

document.querySelector(".arrow.right").addEventListener("click", () => {
  slideImage("right");
});

document.querySelector(".play-pause").addEventListener("click", () => {
  togglePlayPause();
});
