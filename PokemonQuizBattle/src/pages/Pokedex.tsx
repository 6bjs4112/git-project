import { Link } from 'react-router-dom';

type Props = {}

const Pokedex = (props: Props) => {
  return (
      <section className='pokedex'>
        <h1>포켓몬 도감</h1>
        <section className='dexHead'>
          <article className='headLeft'>
            <h2>포켓몬 도감</h2>
            <p>
              모든 포켓몬들의 정보를 확인할 수 있습니다<br/>
              모은 포인트로 잡지 못한 포켓몬을 구입할 수 있습니다
            </p>
          </article>
          <article className='headRight'>
            <p>보유 코인</p>
            <div className='coinBag'>
              <img src='./img/icon/icon_coin.svg'/>
              <b>31</b>
            </div>
          </article>
        </section>

        <section className='pokemonList'>
          <div>#001</div>
          <div>#002</div>
          <div>#003</div>
          <div>#004</div>
          <div>#005</div>
          <div>#006</div>
          <div>#001</div>
          <div>#002</div>
          <div>#003</div>
          <div>#004</div>
          <div>#005</div>
          <div>#006</div>
        </section>
        
        <a className='upBtn'>
          <img src='./img/icon/upBtn_small.png'/>
        </a>

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

export default Pokedex