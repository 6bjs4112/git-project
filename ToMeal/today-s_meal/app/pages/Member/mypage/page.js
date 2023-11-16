"use client"
import Footer from '@/app/com/Footer';
import mypage from './mypage.module.scss'
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function page() {
  let isTr, isMb, res;
  const [DBdata,setDBdata]=useState();
  const [haveTr,setHaveTr]=useState(false);
  

  useEffect(()=>{

    //세션값으로 db정보 찾아 가져오기
    isTr = sessionStorage.getItem('tr_id');
    isMb = sessionStorage.getItem('mb_id');
    console.log(isTr);

    const loginCheck = async function(){
      if(isTr != null){//트레이너
        res = await axios.post("/api/member?type=tr&mode=bring",{isTr});
        setDBdata(res.data);
        setHaveTr(true);

      }
      if(isMb != null){//일반회원
        res = await axios.post("/api/member?type=mb&mode=bring",{isMb});
        setDBdata(res.data);
      }
    }
    loginCheck();
  },[])


  const nav = useRouter();
  const names = useRef();

  const nameClick = ()=>{
    names.current.style = `display:flex`
  }

  //n일째 식단 관리중! 밀리초를 일로
  function msToDay(milliseconds) {
    const dateToday = Date.now();
    const minusMs = dateToday-milliseconds;
    const afterFloor = Math.floor(minusMs/(1000*60*60*24))
    return afterFloor;
  }

//이미지 첨부
  const [imageView,setImageView] = useState();
  const inputRef = useRef();

  //input숨기고 이미지클릭으로 대체
  const addImg = function(){inputRef.current.click();}
  
  const fileChange = function(e){
    const file = e.target.files[0];
    file && setImageView(URL.createObjectURL(file));
  };

  const uploadFile = function(e){
    e.preventDefault();
    const formdata = new FormData(e.target);
    const objF = Object.fromEntries(formdata);
    console.log(obj.upload);
    
    //fileReader 생성자함수 생성
    const fr = new FileReader();
    fr.readAsDataURL(objF.upload);
    
    //DB에 보내주기
    fr.addEventListener('load',function(){
        // axios.post('/api/upload/files',{
        //     title: objF.title,
        //     imgURL: fr.result
        // })
    })
    //반영되게 n초후 새로고침
    setTimeout(function() {
        window.location.reload();
    }, 1000);
  }
  
  return (
    <div className={mypage.mypage_wrap}>
      <div className={mypage.mypage}>
        <header>
          <figure><img src="/character.png" alt="캐릭터 이미지"/></figure>
          <p>오늘의 식단</p>
        </header>

        <div className={mypage.con}>
          <div className={mypage.con_left}>
            <figure><img src=
              {
                haveTr?
                `${DBdata?.tr_img}`:`${DBdata?.mb_img}`
              } 
              alt='프로필 이미지'/></figure>
            <figure>
              <img src='/add.png' alt='이미지 변경' onClick={addImg}/>
              <form
                onSubmit={uploadFile}
                method='post'
                encType='multipart/form-data'
                style={{display:'none'}}
              >
                <input type='file' name='upload' ref={inputRef}
                    onChange={fileChange}
                />
              </form>
            </figure>
          </div>
          <div className={mypage.bg} ref={names}>
            <form>
              <div className={mypage.bg_top}>
                <p>이름</p>
                <input type='text'/>
                <span>최대 8글자</span>
              </div>
              <input type='submit' value='저장' className={mypage.bg_bot}/>
            </form>
          </div>
          <div className={mypage.con_right}>
            <p><span>
              {
                haveTr?
                msToDay(DBdata?.tr_date):msToDay(DBdata?.mb_date)
              }
            </span> 일째 식단관리 중</p>
            <div className={mypage.con_right_li}>
              <ul>
                <li>
                  <p>
                    {
                      haveTr? '총 식단': '식단'
                    }
                  </p>
                  <span>
                    {
                      haveTr?
                      DBdata?.tr_totalMeal.length : DBdata?.mb_myMeal.length
                    }
                  </span>
                </li>
                <li>
                  <p>
                    {
                      haveTr? '미평가': '좋아요'
                    }
                  </p>
                  <span>
                    {
                      haveTr? DBdata?.tr_needJudge.length: DBdata?.mb_like.length
                    }
                  </span>
                </li>
                <li>
                  <p>
                    {
                      haveTr? '회원': '싫어요'
                    }
                  </p>
                  <span>
                    {
                      haveTr? DBdata?.tr_family.length: DBdata?.mb_dislike.length
                    }
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={mypage.con_txt}>
          <ul>
            <li onClick={nameClick}>
              <p>이름</p>
              <p>
                {
                  haveTr? DBdata?.tr_name : DBdata?.mb_name
                }
              </p>
            </li>
            <li>
              <p>아이디</p>
              <p>
                {
                haveTr? DBdata?.tr_id : DBdata?.mb_id
                }
              </p>
            </li>
            <li>
              <p>트레이너 코드</p>
              <p>
                {
                  haveTr? DBdata?.tr_code : DBdata?.mb_code
                }
              </p>
            </li>
          </ul>
        </div>
      </div>

      <div className={mypage.membership_wrap}>
        <header>
          <figure><img src='/arrow_left.png' alt='뒤로가기'/></figure>
          <p>회원관리</p>
        </header>

        <div className={mypage.membership}>
          <ul>
            <li>
              <p>총 식단</p>
              <span>13</span>
            </li>
            <li>
              <p>미평가</p>
              <span>25</span>
            </li>
            <li>
              <p>회원</p>
              <span>10</span>
            </li>
          </ul>
        </div>
        <div className={mypage.membership_list}>
          <ul>
            <li>
              <div className={mypage.membership_list_txt}>
                <figure><img src='/member_img.png' alt='회원이미지'/></figure>
                <p>정우성님</p>
              </div>
              <p>[삭제]</p>
            </li>
            <li>
              <div className={mypage.membership_list_txt}>
                <figure><img src='/member_img.png' alt='회원이미지'/></figure>
                <p>정우성님</p>
              </div>
              <p>[삭제]</p>
            </li>
            <li>
              <div className={mypage.membership_list_txt}>
                <figure><img src='/member_img.png' alt='회원이미지'/></figure>
                <p>정우성님</p>
              </div>
              <p>[삭제]</p>
            </li>
          </ul>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
