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

//////////////pc사이즈 이하 아코디언->스와이퍼 ////////////////////
const swBbody = document.querySelector('main .business .bBody');
const swAccordion = document.querySelector('main .business .bBody .accordion');
const swPackNum = document.querySelectorAll('main .business .bBody .accordion li');

if (document.body.clientWidth < 1280) {
    //pc이외에 클래스 추가하기
    swBbody.classList.add('swiper');
    swBbody.classList.add('mySwiper');
    //swBbody.classList.add('swiper mySwiper');
    swAccordion.classList.add('swiper-wrapper');
    swPackNum.forEach(function(ele,key){
        swPackNum[key].classList.add('swiper-slide');
    })

    //스와이퍼 스크립트
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });
}//end 아코디언->스와이프

///////////////////////비주얼탭 오토플레이///////////////////////////////////////////////
const loadingBarGauge = document.querySelector('.loading .progress_bar .progress_gauge');
const visaulTabs = document.querySelectorAll('main .visual .tab input');
const tabClick = document.querySelectorAll('main .visual .tab .tab-label label');

//라디오 체크에 반응하게 
tabClick.forEach(function(label,key){
    label.onclick = function(){
        
    }
})

//기본 실행 로딩바
let autoNum = 0;
let visualLoading = setInterval(function(){
    if(autoNum<1000){
        autoNum++;
        loadingBarGauge.style =`width:${autoNum/10}%`;
    }else{
        clearInterval(visualLoading);
        autoNum=0;
        //다음탭 체크하기
    }
},10)
visualLoading();





