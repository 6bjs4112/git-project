import { Link } from 'react-router-dom';

type Props = {}

const Detail = (props: Props) => {
  return (
    <section className='pokedex detail'>
      <div className='header'>
        <h1>포켓몬 도감</h1>

        <a className='backBtn'>
          <img src='./img/icon/backBtn_small.png'/>
        </a>
      </div>

      <article className='pkmHead'>
        <div className='bg_typecolor'></div>
        <div className='bg_above'>
          <h3>#001</h3>
          <h2>이상해씨</h2>
          <img src='./img/detailpkm.png'/>
        </div>
      </article>

      <article className='pkmType'>
        <figure className='type ty1'>
          <img src='./img/pkmTypeColor/tablet/grass.svg'/>
          <figcaption>풀</figcaption>
        </figure>
        <figure className='type ty2'>
          <img src='./img/pkmTypeColor/tablet/poison.svg'/>
          <figcaption>독</figcaption>
        </figure>
      </article>

      <article className='pkmDescription'>
        <div className='wrapDesc'>
          <div className='desc'>
            태어나서부터 얼마 동안은 등의 씨앗으로부터 영양을 공급받아 크게 성장한다
          </div>
          <section className='pkmProfile'>
            <div className='height'>키:<span>0.7m</span></div>
            <div className='weight'>무게:<span>6.9kg</span></div>
            <div className='which'>씨앗 포켓몬</div>
          </section>
        </div>
      </article>

      <article className='buyOrNot'>
        <div className='buyBtn'>
          <p>구입하기</p>
          <div className='have'>
            <img src='./img/icon/icon_coin.svg'/>
            <code>5</code>
          </div>
        </div>
      </article>

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

export default Detail