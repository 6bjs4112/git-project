"use client"
import Footer from '@/app/com/Footer';
import mainList from './mainList.module.scss'

export default function () {
  
  return (
    <div className={mainList.mainList_wrap}>
      <header>
        <figure><img src="/character.png" alt="캐릭터 이미지"/></figure>
        <p>오늘의 식단</p>
      </header>

      <div className={mainList.con}>
        <ul>
          <li>
            <div className={mainList.con_top}>
              <div className={mainList.con_top_txt1}>
                <figure><img src='/member_img.png' alt='회원 이미지'/></figure>
                <div className={mainList.con_top_txt2}>
                  <p><span>정우성</span>님의 식단</p>
                  <span>방금 전</span>
                </div>
              </div>
              <figure><img src='/dot.png' alt='글 삭제, 수정 버튼'/></figure>
            </div>
            <div className={mainList.con_mid}>
              <figure><img src='/food_img.png' alt='식단 이미지'/></figure>
              <div className={mainList.con_mid_txt1}>
                <p>트레이너 평가</p>
                <span>트레이너 평가전입니다.</span>
              </div>
              <div className={mainList.con_mid_txt2}>
                <p>오늘 저녁 식단입니다.<br/> 간단하게 양송이를 넣은 샐러드를 만들어 보았습니다.</p>
                <span>더보기</span>
              </div>
            </div>
            <div className={mainList.con_bot}>
              <div className={mainList.con_bot_txt1}>
                <div className={mainList.con_bot_txt1_flex}>
                  <div>
                    <figure><img src='/1_1.png' alt='표정이미지'/></figure>
                    <figure><img src='/2_1.png' alt='표정이미지'/></figure>
                    <figure><img src='/3_1.png' alt='표정이미지'/></figure>
                  </div>
                  <p>김수미님 외 2명</p>
                </div>
                <span>댓글 0</span>
              </div>
              <div className={mainList.con_bot_txt2}>
                <div>
                  <figure><img src='/expression.png' alt='표정짓기'/></figure>
                  <p>표정짓기</p>
                </div>
                <div>
                  <figure><img src='/comment.png' alt='댓글달기'/></figure>
                  <p>댓글달기</p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <Footer/>
    </div>
  )
}
