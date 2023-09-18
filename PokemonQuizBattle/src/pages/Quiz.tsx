import { Link } from 'react-router-dom';

type Props = {}

const Quiz = (props: Props) => {
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

      <figure className='whatType'>
        <img src='./img/pkmTypeColor/mobile/fire.png'/>
      </figure>
      
      <figure className='guessWho'>
        <img src='./img/quizpkm.png'/>
      </figure>

      <div className='whatScript'>
        <div>
          <p>
            꼬리를 휘둘러 상대를 쓰러트리고 날카로운 발톱으로 갈기갈기 찢어버린다.
          </p>
        </div>
      </div>

      <figure className='howManyBalls'>
        <img className='fiveBalls' src='./img/icon/emptyBall.png'/>
        <img className='fiveBalls' src='./img/icon/emptyBall.png'/>
        <img className='fiveBalls' src='./img/icon/haveBall.png'/>
        <img className='fiveBalls' src='./img/icon/haveBall.png'/>
        <img className='fiveBalls' src='./img/icon/haveBall.png'/>
      </figure>
        
      <section className='whatAction'>
        <article className='forBg'>
          <div className='actions'>
              <button className='bigAct'>싸우다</button>
            <div className='forDivide'>
              <button className='smallAct'>조사하다</button>
              <button className='smallAct'>도망치다</button>
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