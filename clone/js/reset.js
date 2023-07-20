//푸터 패밀리사이트 클릭===========================================
const elFamily = document.querySelector('.f-inner .familysite');

elFamily.onclick = function(){
    elFamily.classList.toggle('active');
}
////////////모바일메뉴===============================================
const elMobileMenu = document.querySelector('.mobile_menu');

const elHeader = document.querySelector('.mobile_header');
const elMain = document.querySelector('main');
const elTopBtn = document.querySelector('.page_up');

const openMmenu = document.querySelector('.mobile_header .mHead .mIcon .mBtn'); 
const closeMmenu = document.querySelector('.mobile_menu_wrap .mHead-top .xBtn'); 

openMmenu.onclick=function(e){
    e.preventDefault();
    elMobileMenu.classList.add('active');

    elHeader.style=`display: none`;
    elMain.style=`display: none`;
    elTopBtn.style=`display: none`;
}
closeMmenu.onclick=function(){
    elMobileMenu.classList.remove('active');

    elHeader.style=`display: block`;
    elMain.style=`display: block`;
    elTopBtn.style=`display: block`;
}
//아코디언
$('.mobile_menu_wrap .mHead-area .mDropdown div').on('click',function(){
    $('.mobile_menu_wrap .mHead-area .mDropdown div>ul').stop().slideUp();
    $(this).find('ul').stop().slideToggle();        
    $(this).toggleClass('active')
}) 
//모바일끝~===================================

//서브페이지 헤드-nav
const subNav = document.querySelector('.head-nav .nav-left li .findThis');
const subNavBtn = document.querySelector('.head-nav .nav-left li:nth-of-type(2) a button');

$('.head-nav .nav-left li:nth-of-type(2) a').on('click',function(){
    $('.subNav-drop').stop().slidedown(); 
})