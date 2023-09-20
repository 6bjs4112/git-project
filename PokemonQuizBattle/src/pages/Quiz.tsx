import { Link } from 'react-router-dom';

import { UsePokemonData  } from '../PokemonContext';
import { useContext, useEffect, useState } from 'react';

type Props = {}

const Quiz = (props: Props) => {
  const imgBlurStep1: Element | null = document.querySelector('.guessWho img');
if (imgBlurStep1 !== null) {
  imgBlurStep1.classList.value = 'imgGuess'; // 클래스 이름을 기본으로 만듭니다.
}

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

// 볼 카운트 함수
  const ballMinus = async function(){
    setBallCount((ballCount-1));
    if(ballCount==4){setFirstTry(true);}else
    if(ballCount==3){setSecondTry(true);}else
    if(ballCount==2){setThirdTry(true);}else
    if(ballCount==1){setFourthTry(true);}else
    if(ballCount==0){
      setFifthTry(true);
      await delay(200);
      alert('아앗! 포켓몬이 도망쳤다...');
      window.location.reload();
    }
    console.log('볼 카운트',ballCount);
  }
// 볼 카운트에 따른 이미지 블러 변화
  useEffect(() => {
    if (ballCount === 4) {
      setImgClassName('left4');
    } else if (ballCount === 3) {
      setImgClassName('left3');
    } else if (ballCount === 2) {
      setImgClassName('left2');
    } else if (ballCount === 1) {
      setImgClassName('left1');
    } else {
      setImgClassName('imgGuess');
    }
  }, [ballCount]); // ballCount가 변경될 때만 실행

console.log('볼 카운트', ballCount);

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

    // console.log('입력 값:', inputValue);
    // console.log('정답:',pokemonData[0].speciesData.names[2].name);
    //답 비교
    if(inputValue===pokemonData[0].speciesData.names[2].name){
      setBallCount(5);
      alert(`신난다! ${inputValue} (을/를) 잡았다!`);
      console.log(`${pokemonData[0].name}`);
      window.location.reload();
    }else{
      alert(`오답! 포켓몬이 볼에서 나와버렸다!`);
      setBallCount((ballCount-1));
      console.log('볼 카운트',ballCount);
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
      alert('더 이상 조사할 수 없다!')
    }
    console.log('볼 카운트',ballCount);
    
  }

//도망치다==============
  const [didRun, setDidRun] = useState(false);
  const delay = (ms:number) => new Promise((resolve) => setTimeout(resolve, ms));
  
  const quizPass = async function(){
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
            <div className='hpColor'>&nbsp;</div>
          </div>
        </section>
      </div>

      {
        pokemonData.map((obj:any)=>(
          <>
            <figure className={`whatType ${firstReserch ? 'afterResearch': ''}`}>
              {
                obj.krType.map((krT:any)=>(
                  <img src={krT.imgS}/>
                ))
              }
            </figure>
            
            <figure className='guessWho'>
            {/* <img src={obj.sprites.versions['generation-v']['black-white']['animated']['front_default']} /> */}
            <img className={imgClassName} src={obj.sprites.other.home.front_default} />
            </figure>

            <div className='whatScript'>
              <div className={`textSlot ${secondReserch ? 'afterResearch': ''}`}>
                <p>
                {obj.krDexText[0].flavor_text}
                </p>
              </div>
            </div>
          </>
        ))
      }

      <figure className='howManyBalls'>
        <img className='fiveBalls' src={`${firstTry? './img/icon/emptyBall.png':'./img/icon/haveBall.png'}`}/>
        <img className='fiveBalls' src={`${secondTry? './img/icon/emptyBall.png':'./img/icon/haveBall.png'}`}/>
        <img className='fiveBalls' src={`${thirdTry? './img/icon/emptyBall.png':'./img/icon/haveBall.png'}`}/>
        <img className='fiveBalls' src={`${fourthTry? './img/icon/emptyBall.png':'./img/icon/haveBall.png'}`}/>
        <img className='fiveBalls' src={`${fifthTry? './img/icon/emptyBall.png':'./img/icon/haveBall.png'}`}/>
      </figure>
        
        <div className={`runScript ${didRun ? 'running': ''}`}>
          <div><p> 무사히 도망쳤다!</p></div>
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