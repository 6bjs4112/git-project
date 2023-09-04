jQuery(document).ready(function($){
    $('body').prepend('<article class="onedayPopup"></article>');
    $('.onedayPopup').load('./main_popup.html article', function() {
        const elPopX = document.querySelector('.popFoot .rightFoot');
        const checkbox = document.querySelector('.popFoot .leftFoot input');
        const popupAll = document.querySelector('.onedayPopup');
        
        elPopX.onclick = function(){
            popClick();
        }
        function popClick(){
            if(checkbox.checked){
                let popDay = new Date();
                popDay.setDate(popDay.getDate()+10);
                document.cookie = `event=oneday;expires=${popDay.toUTCString()}`;
            }
            popupAll.style='display: none;'
            //쿠키 있으면 none
        }//end click
        if(document.cookie.match('oneday')){
            popupAll.style='display: none;'
        }else{popupAll.style='display: block;'}
    });

    // $('body').prepend('<div class="menu_moblie" ></div>');
    // $('.menu_moblie').load('./mobile_menu.html article',function(){
    //     $('.mobile_menu_wrap .head-area .dropdown div').on('click',function(e){
    //         e.preventDefault();
    //         $('.mobile_menu_wrap .head-area .dropdown div>ul').stop().slideUp();
    //         $(this).find('ul').stop().slideToggle();        
    //         $(this).toggleClass('active')
    //     })  
    // })
});
