/*
글씨 내려오는 애니메이션 추가하기

클릭 줘야 되는거
모바일 메뉴바-아코디언

메인
-비주얼 사진탭-tab01내용물 바뀌게

-알림마당 광고 슬라이드

-패밀리사이트
*/
// const elVisualLabel = document.querySelectorAll('.visual .tab');
const elVisualLabel = document.querySelectorAll('.visual .tab .tab-label>label');
const elVisualContents = document.querySelectorAll('.tab .tab-wrap .tab-wrap-more div>div');
const elVisualImg = document.querySelectorAll('.tab .tab-wrap .tab-wrap-more div>img');

let tabNum = 0;

elVisualLabel.forEach(function(ele,key){
    ele.onclick = function(){
        elVisualLabel[tabNum].classList.remove('active');
        elVisualLabel[key].classList.add('active');

        elVisualContents[tabNum].classList.remove('active');
        elVisualContents[key].classList.add('active');

        elVisualImg[tabNum].classList.remove('active');
        elVisualImg[key].classList.add('active');
        
        tabNum = key;
    }
})//end forEach