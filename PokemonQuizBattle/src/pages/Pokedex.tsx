import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pokemon } from '../types';

type Props = {}
type NameData = { language: { name: string }; name: string };

const Pokedex = (props: Props) => {
  const [pokemonNameData, setPokemonNameData] = useState<Pokemon[]>([]);

  const pkmDB = axios.create({
    baseURL: 'https://pokeapi.co/api/v2'
    // https://pokeapi.co/api/v2/pokemon?offset=0&limit=151
  })

//데이터 뽑아오고 이름 한국어로 바꾼 배열 만들기
  useEffect(() => {
    const fetchData = async () => {
    const allPokemonData = [];
      for (let i = 1; i <= 151; i++) {
        const basicData = await pkmDB.get(`/pokemon/${i}`);
        const speciesData = await pkmDB.get(`/pokemon-species/${i}`);
        const krNameData = speciesData.data.names.find((name:NameData) => name.language.name === 'ko');
        // 
        const pokemon: Pokemon = {
          name: basicData.data.name,
          url: basicData.data.url,
          ...basicData.data,
          krName: krNameData ? krNameData.name : "N/A"
        };
  
        allPokemonData.push(pokemon);
      }
      setPokemonNameData(allPokemonData);
    }
    fetchData();
  }, []);
  console.log(pokemonNameData);

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
        
              {
                pokemonNameData.map((pokemon:any,num)=>(
                  <div className='eachPokemon'>
                    <div className='eachInner'>
                      <p>#{String(pokemon.id).padStart(3, '0')}<span>{pokemon.krName}</span></p>
                      <img src={pokemon.sprites.other.dream_world.front_default}/>
                      {/* <img src={pokemon.sprites.front_default}/> */}
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
                    </div>
                  </div>
                ))
              }
            
          <div className='eachPokemon'>
            <div className='eachInner'>
              <p>#001<span>이상해씨</span></p>
              <img src='./img/detailpkm.png'/>
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
            </div>
          </div>
          
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