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
        <img src='/'/>
      </figure>
      
      <figure className='guessWho'>
        <img src='/'/>
      </figure>

        

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