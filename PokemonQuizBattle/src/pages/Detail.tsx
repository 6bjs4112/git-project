import axios from 'axios';
import React,{ useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Pokemon } from '../types';
import krTypeData from '../typeData.json'
type Props = {}

const Detail = (props: Props) => {
  const { id } = useParams(); 

//Pokedex에서 떼옴
const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);

const pkmDB = axios.create({
    baseURL: 'https://pokeapi.co/api/v2'
})

//타입 데이터 가져오기
const getKrType: any = (typeName: []) => {
    const typeInfo = krTypeData.filter((type) => {
        let a = typeName.filter((o:any)=>(o.type.name == type.name));
        return a.length > 0
    });
    return typeInfo;
}
//도감설명 한글 데이터만 가져오기
const getKrText:any = ()=>{

}

//데이터 뽑아오고 이름 한국어로 바꾼 배열 만들기
useEffect(() => {
    const fetchData = async () => {
    const allPokemonData = [];
      const [basicData, speciesData] = await Promise.all([
        pkmDB.get(`/pokemon/${id}`),//basic
        pkmDB.get(`/pokemon-species/${id}`),//species
    ]);
    const typeName = basicData.data.types;
    const krTypeInfo = getKrType(typeName);
    
    const flavor_text_entries= speciesData.data.flavor_text_entries;
    const krText = 0;

    const pokemon: Pokemon = {
        name: basicData.data.name,
        speciesData: speciesData.data,
        ...basicData.data,
        krType: krTypeInfo
    };
    allPokemonData.push(pokemon);
        setPokemonData(allPokemonData);
    }
    fetchData();
}, [id]);
console.log(pokemonData);

  return (
    <section className='pokedex detail'>
      <div className='header'>
        <h1>포켓몬 도감</h1>

        <a className='backBtn'>
          <img src='./img/icon/backBtn_small.png'/>
        </a>
      </div>
      {
        pokemonData.map((obj:any)=>(
          <React.Fragment key={obj.name}>
            <article className='pkmHead'>
              {
                obj.krType.map((krT:any, krIndex: number)=>(
                  <div key={krT.id} className='bg_typecolor'style={{ background: krT.color, display: krIndex === 0 ? 'block' : 'none' }}></div>                ))
              }
                <div className='bg_above'>
                <h3>#{String(obj.id).padStart(3, '0')}</h3>
                <h2>{obj.speciesData.names[2]?.name}</h2>
                <img src={obj.sprites.other.dream_world.front_default}/>
                </div>
            </article>

            <article className='pkmType'>
            {
              obj.krType.map((krT:any)=>(
                  <figure key={krT.id} className='type'style={{background:krT.color}}>
                    <img src={krT.imgL}/>
                    <figcaption>{krT.krName}</figcaption>
                  </figure>
              ))
            }
            </article>

            <article className='pkmDescription'>
              <div className='wrapDesc'>
                <div className='desc'>
                  {obj.speciesData.flavor_text_entries.find((entry:any) => entry.language.name === 'ko')?.flavor_text}
                </div>
                <section className='pkmProfile'>
                  <div className='height'>키:<span>{(obj.height)/10}m</span></div>
                  <div className='weight'>무게:<span>{(obj.weight)/10}kg</span></div>
                  <div className='which'>{obj.speciesData.genera[1].genus}</div>
                </section>
              </div>
            </article>
          </React.Fragment>
        ))
      }
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