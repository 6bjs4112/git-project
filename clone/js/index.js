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

/*==================visual=====tab---------------------visual-------------------------tab--------------------===========*/
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

/*==========familysite======================================familysite=======================================familysite===================familysite===========*/
const elFamily = document.querySelector('.f-inner .familysite');

elFamily.onclick = function(){
    elFamily.classList.toggle('active');
}
/*==========ad-slide======================================card-ad=======================================familysite==============
=====advertise===========*/
const elSlide = document.querySelector('.card-ad figure');
const elBtn = document.querySelectorAll('.card-ad .ctrl-slide img');

let sNum = 0;

elBtn.forEach(function(btn,key){
    btn.onclick = function(){

        if(key == 0){
            slidePlay('prev');
        }else if(key==3){
            slidePlay('next');
        }if(key==1){
            clearInterval(slideInterval)
            ;console.log('stop');
        }if(key==2){
            loop(); 
            console.log('go');
        }
    }
})//end elBtn forEach
let slidePlay = function(ele){
    if(ele === 'next'){
        if(sNum < 2){ sNum++; 
        }else if(sNum ==2){sNum=0;}
    }else{ 
        if(sNum > 0){ sNum--;}
        else if(sNum ==0){sNum=2;}
    }
    elSlide.style = `transform: translateX(${-100*sNum}%)`;
}//end slide play

////////slide auto play///////
let slideInterval;
        slideInterval = setInterval(function(){
            slidePlay('next');
        },5000)
function loop(){
    slideInterval = setInterval(slidePlay,5000,'next')
}








