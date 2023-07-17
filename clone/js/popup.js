const elPopX = document.querySelector('.popFoot .rightFoot');
const checkbox = document.querySelector('.popFoot .leftFoot input');
const popupAll = document.querySelector('.onedayPopup');

elPopX.onclick = function(){
    popClick();
}
function popClick(){
    if(checkbox.checked){
        let popDay = new Date();
        popDay.setSeconds(popDay.getSeconds()+10);
        document.cookie = `event=oneday;expires=${popDay.toUTCString()}`;
    }
    popupAll.style='display: none;'
    //쿠키 있으면 none
}//end click
if(document.cookie.match('oneday')){
    popupAll.style='display: none;'
}else{popupAll.style='display: block;'}




