import { Link } from 'react-router-dom';

type Props = {}

const MyPokemon = (props: Props) => {
    return (
        <section className='pokedex myPkm'>
            <h1>내 포켓몬</h1>
            <section className='dexHead'>
                <article className='headLeft'>
                    <h2>내 포켓몬</h2>
                    <p>
                    포획한 포켓몬의 목록을 확인할 수 있습니다
                    </p>
                </article>
            </section>

            <h3 className='collectGauge'>
                <span>30</span>/151
            </h3>

            <section className='pokemonList'>
                <div>#001</div>
                <div>#002</div>
                <div>#003</div>
                <div>#004</div>
                <div>#005</div>
                <div>#006</div>
                <div>#007</div>
                <div>#008</div>
                <div>#009</div>
                <div>#010</div>
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

export default MyPokemon 