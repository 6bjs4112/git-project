let swiper = '';

const elUl = document.querySelectorAll('section.room_sec1 .roomWrapper>ul');

$.ajax({
    url: "../db/room.json",

    success: function(data){

        let tagAll = '', tagStandard = '', tagDeluxe = ''; 
        
        let tagName = '';

        const createRoom = (ele, k) => {
                let sub_tag = '';

                tagName += `<li>
                            <figure>
                                <div class="swiper roomSwiper slide">
                                    <ul class="swiper-wrapper">`;

                    //슬라이드 사진
                ele.roomImg.forEach((src, key)=>{
                            
                            sub_tag += `<li class="swiper-slide">
                                            <a href="./roomDetail.html?key=${k}">
                                            <img src="./img/room/${src}" alt="${ele.roomImgAlt[key]}">
                                            <div class="blackBg"></div>
                                            </a>
                                    </li>`;
                });
                tagName += sub_tag;
    
                
    
                tagName +=              `</ul>
    
                                    <button class="leftBtn swiper-button-prev" type="button"></button>
                                    <button class="rightBtn swiper-button-next" type="button"></button>
                                </div>
    
                                <div class="txtWrapper">
                                    <figcaption>${ele.name}</figcaption>
                                    <span class="roomType">
                                        객실형태: <code>${ele.InRoomAmenities}</code>
                                    </span>
                                    <span class="roomPersonnel">
                                        인원수: <code>${ele.occupancy}</code>
                                    </span>
                                    <a href="./roomDetail.html?key=${k}">DETAIL VIEW</a>
                                </div>
                            </figure>
                        </li>`;

                return tagName;
        }


        // All 탭 - - - - - - - - - - - - - - - - - - - - - - - - -
        data.forEach((ele, k)=>{
                tagAll = createRoom(ele, k);
        });
        tagName = '';

        // Standard 탭 - - - - - - - - - - - - - - - - - - - - - - - - -
        data.forEach((ele, k)=>{
          if(ele.type == "standard single" || ele.type == "standard couple"){
                tagStandard = createRoom(ele, k);
          }

        });
        tagName = '';

        // Deluxe 탭 - - - - - - - - - - - - - - - - - - - - - - - - -
        data.forEach((ele, k)=>{
                if(ele.type == "deluxe single" || ele.type == "deluxe couple"){
                        tagDeluxe = createRoom(ele, k);
                }

        });

        elUl[0].innerHTML = tagAll;
        elUl[1].innerHTML = tagStandard;
        elUl[2].innerHTML = tagDeluxe;

        swiper = new Swiper(".roomSwiper", {
                loop: true,
                navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
                }
        });
        
        $( function() {
                $( "#RoomsTab" ).tabs();
        } );
        
    }, //success


    error: function(){
        console.log('---ajax에 문제가 발생했습니다.---');
    }
});//ajax
