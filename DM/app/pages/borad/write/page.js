import React from 'react'
import style from './page.module.scss'

export default function page() {
  return (
    <article className={style.board_write}>
      <header>
        <figure className={style.logo}><img src='/img/board/write/logo.png'/></figure>
        <div className={style.profile}>
          {/* <img className={style.TpfDecoBox} src='/img/board/write/임시프로필.png'/> */}
          <img className={style.pfDecoBox} src='/img/board/write/profilebox.png'/>
          <div className={style.pfInner}>
            <p>[Rk.<span>1</span>]</p>
            <figure className={style.pfNickname}>
              <img src='/img/board/write/capTest.png'></img>
              <figcaption>행복포기</figcaption>
            </figure>
            <div className={style.pfPicture}>
              <img className={style.pfPicDeco} src='/img/board/write/pfDeco.png'></img>
              <img className={style.pfPic} src='/img/board/write/pfPic.png'></img>
            </div>
          </div>
        </div>
      </header>

      <section className={style.title}>
        <div className={style.titleTab}>
          <img src='/img/board/write/mainDMtab.png'/>
          <h1>DIGIMON MIND (D.M)</h1>
        </div>
        <div className={style.selectTab}>
          <img src='/img/board/write/selectDigimon.png'/>
          <h2>디지몬 선택</h2>
        </div>
      </section>

      <section className={style.drawing}>
        <div className={style.canvasWrapper}>
          <img src='/img/board/write/canvas_deco.png'/>
          <canvas id="canvasId"></canvas>
        </div>
      </section>

      <section className={style.drawTool}>
        <div className={style.toolboxDeco}>
          <img src='/img/board/write/drawTab.png'/>
          <div className={style.toolbox}>
            <input type='color'/>
            <figure className={style.lineWeight}>
              <img src='/img/board/write/lineWeight_icon.png'/>
              <input type='range'/>
              <figcaption>굵기</figcaption>
            </figure>
            <figure className={style.undo}>
              <img src='/img/board/write/undo.png'/>
              <figcaption>되돌리기</figcaption>
            </figure>
            <figure className={style.erase}>
              <img src='/img/board/write/erase.png'/>
              <figcaption>지우기</figcaption>
            </figure>
          </div>
        </div>
      </section>
    </article>
  )
}
