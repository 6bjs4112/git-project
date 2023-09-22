import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect,useState } from 'react';
import gifPokemon from '../animated_menu_sprites.json';

type Props = {}

const MyPokemon = (props: Props) => {
    //퀴즈로 잡은 포켓몬 불러오기
    const [boxList, setBoxList] = useState<[]>([]);
    axios
        .get('http://localhost:3030')
        .then((res)=>{
            setBoxList(res.data)
        })
    //밀리초를 년월일로 변환
    function millisecToYMD(sec:number) {
        return new Date(sec).toISOString().split('T')[0];
    }

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
                총&nbsp;<span>{boxList.length}</span>&nbsp;마리
            </h3>

            <section className='pokemonList'>
                {
                    boxList.map((boxList:any)=>(
                        <div className='eachPokemon' key={boxList.date}>
                            <Link to={`/${boxList.id}`}>
                                <div className='eachInner' id={boxList.id}>
                                    <div>
                                        <p>
                                            #{String(boxList.id).padStart(3, '0')}<br/>
                                            <span>{boxList.name}</span>
                                        </p>
                                    </div>
                                    <img src={gifPokemon[boxList.id-1].gif}/>
                                    <p className='YMD'>{millisecToYMD(boxList.date)}</p>
                                </div>
                            </Link>
                        </div>
                    ))
                }
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