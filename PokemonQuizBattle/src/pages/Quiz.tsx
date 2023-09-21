import { Link } from 'react-router-dom';

import { UsePokemonData  } from '../PokemonContext';
import React, { useContext, useEffect, useRef, useState } from 'react';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'
import axios from 'axios';

type Props = {}

const Quiz = (props: Props) => {
  //퀴즈 데이터 불러오기
  const { fetchData } = useContext(UsePokemonData);
  
  useEffect(() => {
    const randomId = Math.floor(Math.random() * 151) + 1;
    fetchData(randomId); 
  }, []);
  const {pokemonData, setPokemonData} = useContext(UsePokemonData);
  
  // console.log(pokemonData);
  

//볼 카운트
  const [ballCount,setBallCount] = useState<number>(5);
  const [imgClassName, setImgClassName] = useState<string>('');
  
  const [firstTry, setFirstTry] = useState<boolean>(false);  
  const [secondTry, setSecondTry] = useState<boolean>(false);  
  const [thirdTry, setThirdTry] = useState<boolean>(false);  
  const [fourthTry, setFourthTry] = useState<boolean>(false);  
  const [fifthTry, setFifthTry] = useState<boolean>(false); 
  
  //hp창 잡기
  const hpColorRef = useRef<HTMLDivElement | null>(null);

// 볼 카운트 함수
  const ballMinus = async function(){
    setBallCount((ballCount-1));
    let updateBallCount = ballCount-1;

    //카운트에 따라 hp변화
    const hpColorWidth = (updateBallCount / 5) * 100 + '%';

    // hpColor 스타일 업데이트
    if (hpColorRef.current) {
      hpColorRef.current.style.width = hpColorWidth;

      if (updateBallCount <= 3) {
        hpColorRef.current.classList.add('hpColor-yellow');
        if(updateBallCount == 1){
          hpColorRef.current.classList.remove('hpColor-yellow');
          hpColorRef.current.classList.add('hpColor-red');
        }
      } else {
        hpColorRef.current.classList.remove('hpColor-yellow');
        hpColorRef.current.classList.remove('hpColor-red');
      }
    }

    if(updateBallCount==4){
      setFirstTry(true);
      setImgClassName('left4');
    }
    else if(updateBallCount==3){
      setSecondTry(true);
      setImgClassName('left3');
    }
    else if(updateBallCount==2){
      setThirdTry(true);
      setImgClassName('left2');
    }
    else if(updateBallCount==1){
      setFourthTry(true);
      setImgClassName('left1');
    }
    else if(updateBallCount==0){
      setFifthTry(true);
      setImgClassName('left0');
      
      await delay(200);
      if(pokemonData[0].speciesData.names[2].name==inputValue){
        //정답일경우 nameSubmit 함수에서 처리
      }else{
        Swal.fire({
          title: '아앗!',
          text: '포켓몬이 도망쳤다...',
          icon: 'error',
          confirmButtonText: '확인'
        })
        await delay(2000);
        window.location.reload();
      }
      
    }
    console.log('볼 카운트',ballCount);
  }


//싸우다=================
  //인풋창 열기
  const [isInputVisible, setInputVisible] = useState(false);
  const pkmNameInput = () => {
    setInputVisible(!isInputVisible);
  };
  //인풋창 값 받기
  const [inputValue, setInputValue] = useState('');
  
  const nameSubmit = async function(){
    setInputVisible(false);//입력창 닫기
    //답 제출 후 볼감소
    ballMinus();
    const correctAnswer = pokemonData[0].speciesData.names[2].name;
    const iconData = pokemonData[0].sprites.versions['generation-vii']['icons']['front_default'];
    
    if(inputValue===correctAnswer){
      setImgClassName('left0');
      setBallCount(5);
      await delay(500);
      // console.log(pokemonData[0].id,pokemonData[0].name);
      
      axios.post('http://localhost:3030/insert',{id:pokemonData[0].id, name:pokemonData[0].name})
      
      Swal.fire({
        title: '신난다!',
        text: `${inputValue} (을/를) 잡았다!`,
        icon: 'success',
        // imageUrl:`${iconData}`,
        // imageWidth:'200',
        // imageHeight:'200',
        confirmButtonText: '확인'
      })
      await delay(1500);
      Swal.fire({
        imageUrl:'./img/icon/icon_coin.svg',
        imageWidth:'100',
        imageHeight:'100',
        title: `${ballCount} 코인 획득!`,
        confirmButtonText: '확인'
      })
      await delay(2000);
      window.location.reload();

    }else{
      if(ballCount!=1){
        Swal.fire({
          title: '오답!',
          text: '포켓몬이 볼에서 나와버렸다!',
          icon: 'warning',
          confirmButtonText: '확인'
        })
        setBallCount((ballCount-1));
        console.log('볼 카운트',ballCount);
      }
    }
    setInputValue('');//입력창 비우기

  }
  //엔터로 제출하게
  const enterKeyPress = function(e:any){
    if (e.key === 'Enter') {
      nameSubmit(); 
    }
  }
//조사하다======================
  const [firstReserch, setFirstReserch] = useState<boolean>(false);  
  const [secondReserch, setSecondReserch] = useState<boolean>(false); 

  const reserch = async function(){
    if(firstReserch===false){
      setFirstReserch(true);
      ballMinus();
      // setBallCount((ballCount-1));
    }else if(secondReserch===false){
      setSecondReserch(true);
      ballMinus();
      // setBallCount((ballCount-1));
    }else{
      Swal.fire({
        text: '더 이상 조사할 수 없다!',
        icon: 'warning',
        confirmButtonText: '확인',
        confirmButtonColor: '#0E1F40'
      })
    }
    console.log('볼 카운트',ballCount);
  }

//도망치다==============
  const [didRun, setDidRun] = useState(false);
  const delay = (ms:number) => new Promise((resolve) => setTimeout(resolve, ms));
  
  const quizPass = async function(){
    // ballMinus();
    setDidRun(true);
    await delay(1000);
    window.location.reload();
  }

  return (
    <section className='quiz'>
      <h1>포켓몬 퀴즈</h1>

      <div className='targetHp'>
        <section className='innerbar'>
          <div className='hp'>HP:</div>
          <div className='hpTank'>
            <div className='hpColor'ref={hpColorRef}>&nbsp;</div>
          </div>
        </section>
      </div>

      {
        pokemonData.map((obj:any)=>(
          <React.Fragment key={obj.id}>
            <figure key={obj.id} className={`whatType ${firstReserch ? 'afterResearch': ''}`}>
              {
                obj.krType.map((krT:any)=>(
                  <img key={krT.id} src={krT.imgS}/>
                ))
              }
            </figure>
            
            <figure className='guessWho'>
            {/* <img src={obj.sprites.versions['generation-v']['black-white']['animated']['front_default']} /> */}
            {/* <img className={imgClassName} src={obj.sprites.front_default} /> */}
            <img className={imgClassName} src={obj.sprites.other.home.front_default} />
            </figure>

            <div className='whatScript'>
              <div className={`textSlot ${secondReserch ? 'afterResearch': ''}`}>
                <p>
                {obj.krDexText[0].flavor_text}
                </p>
              </div>
            </div>
          </React.Fragment>
        ))
      }

      <figure className='howManyBalls'>
        <img className='fiveBalls' src={`${firstTry? './img/icon/emptyBall.png':'./img/icon/haveBall.png'}`}/>
        <img className='fiveBalls' src={`${secondTry? './img/icon/emptyBall.png':'./img/icon/haveBall.png'}`}/>
        <img className='fiveBalls' src={`${thirdTry? './img/icon/emptyBall.png':'./img/icon/haveBall.png'}`}/>
        <img className='fiveBalls' src={`${fourthTry? './img/icon/emptyBall.png':'./img/icon/haveBall.png'}`}/>
        <img className='fiveBalls' src={`${fifthTry? './img/icon/emptyBall.png':'./img/icon/haveBall.png'}`}/>
      </figure>

    {/* 팝업창들 */}
        <div className={`runScript ${didRun ? 'running': ''}`}>
          <div><p> 무사히 도망쳤다!</p></div>
        </div>

        <div className="tutorial" style={{ opacity: firstTry ? '0' : '1' }}>
          <div className='t_inner'>
            <section>
              <b>몬스터볼이 다 떨어지기 전에 포켓몬을 잡자!</b>
              <span>(모든 행동은 몬스터볼 1개를 소모한다)</span><br/>
              <dl>
                <div>
                  싸우다:<br/>
                  <span>퀴즈를 맞추고<br/>포켓몬을 잡는다</span>
                </div>
                <div>
                  조사하다:<br/>
                  <span>힌트를 준다<br/>두 번 쓸 수 있다</span>
                </div>
                <div>
                  도망치다:<br/>
                  <span>다음 포켓몬으로 넘어간다<br/></span>
                </div>
              </dl>
            </section>
          </div>
        </div>


      <section className='whatAction'>
        <article className='forBg'>
          <div className='actions'>
              <button className='bigAct' onClick={pkmNameInput}>싸우다</button>
                {isInputVisible && (
                  <form onSubmit={nameSubmit}>
                    <input type="text"
                      className='nameInput'
                      placeholder="무슨 포켓몬일까요?" 
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={enterKeyPress}
                    />
                  </form>
                )}
            <div className='forDivide'>
              <button className='smallAct' onClick={reserch}>조사하다</button>
              <button className='smallAct' onClick={quizPass}>도망치다</button>
            </div>
          </div>
        </article >
      </section>

      <nav className='botNav'>
        <div className='navWrap'>
          <figure className='navBtn'>
              <Link to="/quiz">
                <img src='./img/icon/nav_white_pokeball.png'/>
                퀴즈
              </Link>
          </figure>
          <figure className='navBtn'>
              <Link to="/">
                <img src='./img/icon/nav_home.png'/>
                홈
              </Link>
          </figure>
          <figure className='navBtn'>
              <Link to="/pokedex">
                <img src='./img/icon/nav_dex.png'/>
                도감
              </Link>
          </figure>
          <figure className='navBtn'>
              <Link to="/mypokemon">
                <img src='./img/icon/nav_love.png'/>
                <span style={{whiteSpace: 'nowrap'}}>내 포켓몬</span>
              </Link>
          </figure>
        </div>
      </nav>
    </section>
  )
}

export default Quiz