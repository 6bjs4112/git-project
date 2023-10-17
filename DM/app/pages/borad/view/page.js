"use client"
import { useRouter } from 'next/navigation';
import style from './page.module.scss'
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import {user_get} from '../../../comp/member/Login'
// import Link from 'next/link';
import Footer from '@/app/comp/Footer';
// import LoginCheck from '@/app/comp/LoginCheck';

export default function page() {
  // url에서 받아오기~~~~
  // const router = useRouter();
  // const { id } = router.query;

  //회원정보
  const [member,setMember] = useState();
  const [rk,setRk] = useState();

  async function fetchData() {
      const mb = await user_get()
      setRk(mb.rk.data)
      setMember(mb.data);
  }

  useEffect(()=>{
    fetchData();
  },[])

  //get으로 DB정보 가져오기
  const [data,setData] = useState([]);

  const getFile = async function(){
    try {
      const dbData = await axios.get('/api/borad/list');
      setData(dbData.data);
    } catch (error) {
      console.error("AxiosError:", error);
    }
  }
  useEffect(()=>{
    getFile();
  },[])

  if(!member) return <></>
  return (
    <article className={style.board_write}>
      {/* <LoginCheck />  */}
      <header>
        <figure className={style.logo}><img src='/img/board/write/logo.png'/></figure>
        <div className={style.profile} >
          <img className={style.pfDecoBox} src='/img/board/write/profilebox.png'/>
          <div className={style.pfInner}>
            <p>[Rk.{rk}]</p>
            <figure className={style.pfNickname}>
              <img src={`/img/main/icon/${member.mb_icon}.png`}/>
              <figcaption>{member.mb_nick}</figcaption>
            </figure>
            <div className={style.pfPictureWrap}>
              <div className={style.pfPicture}>
                <img className={style.pfPic} src={`/img/main/face/${member.mb_img}.png`}/>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className={style.title}>
        <div className={style.titleTab}>
          <img className={style.titleDeco} src='/img/board/write/mainDMtab.png'/>
          <h1>DIGIMON MIND (D.M)</h1>
        </div>
      </section>

      <section className={style.drawing}>
        <div className={style.canvasWrapper}>
          <img className={style.canvasDeco} src='/img/board/write/canvas_deco.png'/>
          {/* <img className={style.canvasDeco} src='/img/board/write/canvas_deco.png'/> */}
        </div>
      </section>

      

      <Footer/>
    </article>
  )
}
