import React,{ useContext, useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import { UsePokemonData  } from '../PokemonContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import pricePokemon from '../animated_menu_sprites.json';

type Props = {}

const Detail = (props: Props) => {
  const { id } = useParams(); 
  const { fetchData } = useContext(UsePokemonData);
  
  useEffect(() => {
    fetchData(id); 
  }, [fetchData, id]);
  
  const {pokemonData, setPokemonData} = useContext(UsePokemonData);
  

  //퀴즈로 잡은 포켓몬 불러오기
  const [boxList, setBoxList] = useState<[]>([]);
  useEffect(() => {
    axios
      .get('http://localhost:3030')
      .then((res)=>{
          setBoxList(res.data)
      })
  }, []); 

  //박스에 있는 포켓몬인지 확인하기
  const isPokemonInBox = 
    boxList.some((pokemon:any) => pokemon.id == id);

  //구입하기
  const [coinBag, setCoinBag] = useState<[]>([]);
  const purchase= function(){
    axios.get('http://localhost:3030/coin')
    .then((res)=>{
      let howManyCoins = res.data.coinAmount
      setCoinBag(howManyCoins)

      if ( howManyCoins >=5){
        //코인 소모
        axios.post('http://localhost:3030/useCoin',{coinAmount:5})
        //포켓몬 구입
        axios.post('http://localhost:3030/addPokemon',{id:pokemonData[0].id, name:pokemonData[0].speciesData.names[2]?.name,date:Date.now()})
        
        Swal.fire({
          text: `${pokemonData[0].speciesData.names[2]?.name} (을/를) 구입했습니다!`,
          icon: 'success',
          confirmButtonText: '확인'
        }).then((result) => {//첫번째 확인 버튼 누른 뒤 실행
          if (result.isConfirmed) {
            Swal.fire({
              text: `남은 코인: ${howManyCoins - 5}`,
              icon: 'success',
              confirmButtonText: '확인'
            }).then((result) => {
              if (result.isConfirmed) {
                //구입 후 새로고침
                window.location.reload();
              }
            });
          }
        })
        
      } else {
        Swal.fire({
          text: '코인이 모자랍니다!',
          titleText: `보유 코인: ${howManyCoins}`,
          icon: 'error',
          confirmButtonText: '확인'
        })
      }
    })  
  }
  //뒤로 버튼
  const navigate = useNavigate();
  const goBack = function(){
    navigate(-1);
  } 
  return (
    <section className='pokedex detail'>
      <div className='header'>
        <h1>포켓몬 도감</h1>

        <a className='backBtn' onClick={goBack}>
          <img src='/3rdPkmQuiz/img/icon/backBtn_small.png'/>
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
                {/* <img src={obj.sprites.front_default}/> */}
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
                <div className='desc'style={{ wordBreak: 'keep-all' }}>
                {obj.krDexText[2].flavor_text}
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
        {isPokemonInBox ? (
          <div className='buyBtn purchased'>
            <p>획득 완료</p>
            {/* <code>{boxList[id].date}</code> */}
          
          </div>
        ) : (
          <div className='buyBtn' onClick={purchase}>
            <p>구입하기</p>
            <div className='pay'>
              <img src='/3rdPkmQuiz/img/icon/icon_coin.svg'/>
              <code>
                {
                  pokemonData.map((obj:any)=>(
                    pricePokemon[(obj.id)-1].price
                  ))
                }
              </code>
              
            </div>
          </div>
        )}
      </article>
        

      <nav className='botNav'>
        <div className='navWrap'>
          <figure className='navBtn'>
              <Link to="/quiz">
                <img id='pkball' src='/3rdPkmQuiz/img/icon/nav_white_pokeball.png'/>
                퀴즈
              </Link>
          </figure>
          <figure className='navBtn'>
              <Link to="/">
                <img id='home' src='/3rdPkmQuiz/img/icon/nav_home.png'/>
                홈
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
  )
  
}

export default Detail