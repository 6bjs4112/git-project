$(document).ready(function () {
  $.get("./common/mainCommon.html", function (data) {
    var headerContent = $(data).filter("header").html();
    var footerContent = $(data).filter("footer").html();

    headerContent = headerContent.replace(
      '"../common/img/wh_logo.PNG',
      '"./common/img/wh_logo.PNG'
    );
    footerContent = footerContent.replace(
      '"../common/img/wh_logo.PNG',
      '"./common/img/wh_logo.PNG'
    );

    $("header").html(headerContent);
    $("footer").html(footerContent);
  });

const elBtn = document.querySelector(".more_btn");
const textBox = document.querySelector(".text_box");
const imgBox = document.querySelector(".img_box");
const acorImg = document.querySelector(".acor_wrap");
const btnClose = document.querySelector(".acor_wrap .btn_close");

elBtn.addEventListener("click", function () {
  imgBox.classList.add("deactive");
  textBox.classList.add("deactive");
  acorImg.classList.remove("deactive");
  btnClose.style.display = "block";
});

btnClose.addEventListener("click", function () {
  imgBox.classList.remove("deactive");
  textBox.classList.remove("deactive");
  acorImg.classList.add("deactive");
  btnClose.style.display = "none";
});
const acorImages = document.querySelectorAll(".acor_img");

acorImages.forEach((acorImg) => {
  const figDesc = acorImg.querySelector(".sec2_desc");

  acorImg.addEventListener("mouseover", function () {
    acorImg.style.flex = "7";
    setTimeout(function () {
      figDesc.classList.add("on");
    }, 700);
  });

  acorImg.addEventListener("mouseout", function () {
    figDesc.classList.remove("on");
    acorImg.style.flex = "1";
    });
  });
});

// sec1 룸선택 부분 스와이퍼

$(function () {
  var swiper = new Swiper(".swiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 3,
      slideShadows: true,
    },
    keyboard: {
      enabled: true,
    },
    mousewheel: {
      thresholdDelta: 70,
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
      clickable: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 1,
      },
      1024: {
        slidesPerView: 2,
      },
      1560: {
        slidesPerView: 2,
      },
    },
  });
});

// sec2 모바일
const content = [
  {
    image: "./main/img/main_sec2_img1.jpg",
    title: "다이닝 룸",
    text: "다이닝은 신선하고 고급스러운 재료로 만든 다양한 요리를 제공합니다. 메뉴는 매일 바뀌며, 계절에 따라 제철 식재료를 사용합니다.다이닝은 제주 숲을 감상할 수 있는 아름다운 공간으로,편안하고 여유로운 분위기에서 식사를 즐길 수 있습니다.",
  },
  {
    image: "./main/img/main_sec2_img2.jpg",
    title: "공용주방",
    text: " 공용 주방은 투숙객들이 함께 요리하고 식사할 수 있는 공간입니다. 주방에는 다양한 조리기구와 식기류가 구비되어 있어 편리하게 이용할 수 있습니다.공용 주방은 예약제로 운영되며 예약은 프런트 데스크에서 할 수 있습니다. 이용 시간은 오전 10시부터 오전 0시까지입니다.",
  },

  {
    image: "./main/img/main_sec2_img3.jpg",
    title: "반려동물 운동장",
    text: "라이온힐에 머무시는 동안 반려동물들이 마음껏 뛰어놀 수있는 공간입니다.",
  },

  {
    image: "./main/img/main_sec2_img4.jpg",
    title: "피트니스 센터",
    text: "최신 운동기구와 편안한 공간을 제공합니다.머무는 동안 피트니스 센터를 이용하여 건강하고 활기찬 휴식을 즐겨보세요. 이용 시간은 오전 6시부터 오후 8시까지입니다.",
  },

  {
    image: "./main/img/main_sec2_img5.jpg",
    title: "수영장",
    text: "각 객실별로 프라이빗 온수 풀이 있습니다.아름다운 제주 숲을 만끽하며 수영할 수 있습니다.",
  },

  // 추가적인 컨텐츠 객체들을 여기에 추가하세요
];

let currentIndex = -1;
const changingImage = document.getElementById("changingImage");
const changingTitle = document.getElementById("changingTitle");
const changingText = document.getElementById("changingText");

function changeContent() {
  currentIndex = (currentIndex + 1) % content.length;
  changingImage.onload = function () {
    changingTitle.textContent = content[currentIndex].title;
    changingText.textContent = content[currentIndex].text;

    // 새 이미지의 로드 과정을 시작하기 위해 src를 다시 설정합니다.
    changingImage.src = content[currentIndex].image;
    changingText.src = content[currentIndex].text;
    changingTitle.src = content[currentIndex].title;
    changingBtn.src = content[currentIndex].btn;
  };
  // 이미지 로드 과정을 시작하기 위해 src를 설정합니다.
  changingImage.src = content[currentIndex].image;
  changingText.src = content[currentIndex].text;
  changingTitle.src = content[currentIndex].title;
  changingBtn.src = content[currentIndex].btn;
}

// 초기 이미지를 표시하기 위해 changeContent 함수를 즉시 한 번 호출합니다
changeContent();

// 5초마다 컨텐츠 변경
setInterval(changeContent, 5000);

var button = document.getElementById("changingBtn");

function handClick() {
  window.location.href = "./sub/fac.html";
}

button.onclick = handClick;
