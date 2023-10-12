"use client"
import React, { useEffect, useRef, useState } from 'react'
import style from './page.module.scss'

export default function page() {
  // ~~~~기본값 지정~~~~
  let [lineSize,setLineSize] = useState(1);

  useEffect(() => {
    console.log(lineSize)
    let ctx = canvasId.getContext('2d');
    let cSize = {w:canvasId.width, h:canvasId.height};

      // ~~~~그림 그리기~~~~
      let status = false;
      //클릭 시작
      canvasId.onmousedown = function(){
          status = true;
          ctx.beginPath();
          console.log('클릭중');
      }
      //클릭 끝
      canvasId.onmouseup =function(){
        status = false;
          saveSnapshot();
          console.log('클릭 끝');
      }
      canvasId.onmousemove = drawMove;

      //그림그리는 함수
      function drawMove(e){
        if(status===true){
            ctx.lineWidth = lineSize;
            ctx.strokeStyle = lineColor;
            ctx.lineTo(e.offsetX,e.offsetY);
            ctx.stroke();
        }
      }

    //~~~~~~~~~색상 변경~~~~~~~~~
    let lineColor = colorId.value;
    colorId.onchange = function (){
      lineColor = this.value;
    }
    
    //~~~~~~~~~선 두께 변경~~~~~~~~~
    
    lineSizeId.onchange = function (){
      setLineSize(this.value);     
    }
    
    
    //~~~~~~~~~지우기 버튼~~~~~~~~~
    eraseId.onclick =  eraseCanvas;

    function eraseCanvas() {
      ctx.clearRect(0, 0, cSize.w, cSize.h);
    }
    //~~~~~저장버튼~~~~~~
    saveId.onclick = function () {
      const dataURL = canvasId.toDataURL();
      const a = document.createElement('a');
      a.href = dataURL;
      a.download = 'canvas-image.png';
      a.click();
    }

    //~~~~~~~~~되돌리기 버튼~~~~~~~~~
    undoId.onclick = onClickUndo;
    
    function onClickUndo() {
      if (currentSSIndex>= 0) {
        currentSSIndex--;
        restoreSnapshot();
      }
    }

    let undoArray = [];
    let currentSSIndex = -1;
    const undoLimit = 5;

    function saveSnapshot() {
      undoArray.push(canvasId.toDataURL());
      currentSSIndex = undoArray.length - 1;

      if (undoArray.length > undoLimit) {
        undoArray.shift();
        currentSSIndex--;
      }
    }

    function restoreSnapshot() {
      if (currentSSIndex >= 0) {

        let prevImg = new Image();
        prevImg.src = undoArray[currentSSIndex];

        prevImg.onload = function () {
          ctx.clearRect(0, 0, cSize.w, cSize.h);
          ctx.drawImage(prevImg, 0, 0, cSize.w, cSize.h);
        };
      }
    }

  },[lineSize])

  //~~~~~~~~~두께 슬라이더 토글~~~~~~~~~
  const [sliderOn, setSliderOn] = useState(false);
  const toggleSlider = () => {
    setSliderOn(!sliderOn);
  };

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
              <img src='/img/board/write/capsule (10).png'></img>
              <figcaption>행복포기</figcaption>
            </figure>
            <div className={style.pfPictureWrap}>
              <div className={style.pfPicture}>
                <img className={style.pfPicDeco} src='/img/board/write/pfDeco.png'></img>
                <img className={style.pfPic} src='/img/board/write/pfPic01.png'></img>
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
        <div className={style.selectTab}>
          <img className={style.selectDeco} src='/img/board/write/selectDigimon.png'/>
          <h2>디지몬 선택</h2>
        </div>
      </section>

      <section className={style.drawing}>
        <div className={style.canvasWrapper}>
          <img className={style.canvasDeco} src='/img/board/write/canvas_deco.png'/>
          <canvas id="canvasId" width="489" height="429"></canvas>
        </div>
      </section>

      <section className={style.drawTool}>

        <div className={style.toolboxDeco}>
          <img src='/img/board/write/drawTab.png'/>
          <div className={style.toolbox}>
            <input type='color'id="colorId"/>
            <figure className={style.lineWeight} onClick={toggleSlider}>
              <img src='/img/board/write/lineWeight_icon.png'/>
              <div className={ sliderOn ? style.verticalRange : style.verticalRangeOff}>
                <input type='range'id="lineSizeId" min="1" max="10" value={lineSize}  onChange={(e)=>{setLineSize(e.target.value)}}  step="1" orient="vertical"/>
              </div>
              <figcaption>굵기</figcaption>
            </figure>
            <figure id='undoId' className={style.undo}>
              <img src='/img/board/write/undo.png'/>
              <figcaption>되돌리기</figcaption>
            </figure>
            <figure id='eraseId' className={style.erase}>
              <img src='/img/board/write/erase.png'/>
              <figcaption>지우기</figcaption>
            </figure>
          </div>
        </div>

        <div className={style.save} id="saveId">
          <img className={style.saveDeco} src='/img/board/write/saveBtn.png'/>
          <p className={style.saveText}>저장하기</p>
        </div>
      </section>

      <footer>
        <div className={style.footInner}>
          <img src='/img/board/write/main_icon01.png'/>
          <img src='/img/board/write/main_icon02.png'/>
          <img src='/img/board/write/main_icon03.png'/>
          <img src='/img/board/write/main_icon04.png'/>
          <img src='/img/board/write/main_icon05.png'/>
        </div>
      </footer>
    </article>
  )
}
