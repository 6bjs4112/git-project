import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Pokemon } from '../types';
import krTypeData from '../typeData.json'
import InfiniteScroll from 'react-infinite-scroll-component';


type Props = {}


const Pokedex = (props: Props) => {

//Pokedex 전용 151데이터
const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);

const pkmDB = axios.create({
    baseURL: 'https://pokeapi.co/api/v2'
})

//한글 타입 데이터 가져오기
const getKrType: any = (typeName: []) => {
    const typeInfo = krTypeData.filter((type) => {
        let match = typeName.filter((o:any)=>(o.type.name == type.name));
        return match.length > 0
    });
    return typeInfo;
}
  //로딩 개선용
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pokemonPerPage = 16;
  const totalPokemon = 151;

  const fetchMoreData = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

//데이터 뽑아오고 이름 한국어로 바꾼 배열 만들기
useEffect(() => {
    const fetchData = async () => {
    const allPokemonData = [];
        for (let i = 1; i <= Math.min(currentPage*pokemonPerPage, totalPokemon); i++) {
            const [basicData, speciesData] = await Promise.all([
                pkmDB.get(`/pokemon/${i}`),//basic
                pkmDB.get(`/pokemon-species/${i}`),//species
            ]);
            const typeName = basicData.data.types;
            const krTypeInfo = getKrType(typeName);

            const pokemon: Pokemon = {
                name: basicData.data.name,
                speciesData: speciesData.data,
                ...basicData.data,
                krType: krTypeInfo
            };
            allPokemonData.push(pokemon);
        }
        setPokemonData(allPokemonData);
    }
    fetchData();
}, [currentPage]);
console.log(pokemonData);

//코인 데이터 가져오기
const [coinBag, setCoinBag] = useState<number>();
axios.get('https://port-0-pkmquizserver-euegqv2bln1go1zj.sel5.cloudtype.app/coin')
  .then((res)=>{
    setCoinBag(res.data.coinAmount)    
  })

  //탑버튼
  const scrollToTop=()=>{
    window.scrollTo({
        top:0,
        behavior:"smooth"
    })
}

  return (
    <InfiniteScroll
    dataLength={pokemonData.length}
    next={fetchMoreData}
    hasMore={currentPage * pokemonPerPage < 151}
    loader={<h4 className="loading-message">Loading...</h4>}
    // endMessage={<p>All Pokémon have been loaded</p>}
    className="container"
  >
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
              <img src='/3rdPkmQuiz/img/icon/icon_coin.svg'/>
              <b>{coinBag}</b>
            </div>
          </article>
        </section>

        <section className='pokemonList'>
        
              {
                pokemonData.map((pokemon:any,num:number)=>(
                  <div className='eachPokemon' key={num}>
                    <Link to={`/${pokemon.id}`}>
                      <div className='eachInner' id={pokemon.id}>
                        <div>
                          <p>
                            #{String(pokemon.id).padStart(3, '0')}
                            <span>{pokemon.speciesData.names[2]?.name}</span>
                          </p>
                        </div>
                        <img src={pokemon.sprites.other.dream_world.front_default}/>
                        <article className='pkmType'>
                          {
                            pokemon.krType.map((obj:any)=>(
                                <figure className='type'key={obj.id} style={{background:obj.color}}>
                                <img src={obj.imgL}/>
                                <figcaption>{obj.krName}</figcaption>
                                </figure>
                              ))
                          }
                        </article>
                      </div>
                    </Link>
                  </div>
                ))
              }          
        </section>
        

        <nav className='botNav'>
          <a className='upBtn' onClick={scrollToTop}>
            <img src='/3rdPkmQuiz/img/icon/upBtn_small.png'/>
          </a>
          <div className='navWrap'>
            <figure className='navBtn'>
                <Link to="/">
                  <img id='home' src='/3rdPkmQuiz/img/icon/nav_home.png'/>
                  홈
                </Link>
            </figure>
            <figure className='navBtn'>
                <Link to="/quiz">
                  <img id='pkball' src='/3rdPkmQuiz/img/icon/nav_white_pokeball.png'/>
                  퀴즈
                </Link>
            </figure>
            <figure className='navBtn'>
                <Link to="/pokedex">
                  <img id='dex' src='/3rdPkmQuiz/img/icon/nav_dex.png'/>
                  도감
                </Link>
            </figure>
            <figure className='navBtn'>
                <Link to="/mypokemon">
                  <img id='love' src='/3rdPkmQuiz/img/icon/nav_love.png'/>
                  <span style={{whiteSpace: 'nowrap'}}>내 포켓몬</span>
                </Link>
            </figure>
          </div>
        </nav>
      </section>
      </InfiniteScroll>
  )
}

export default Pokedex