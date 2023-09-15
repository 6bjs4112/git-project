import { Link } from 'react-router-dom';

type Props = {}

const Home = (props: Props) => {
    return (
        <>
            <section className='homepage'>
                <figure className='logo'>
                    <img src='./img/homepage/LogoPkmQuizBattle.png'/>
                </figure>
                <strong>퀴즈를 맞추고<br/>포켓몬을 손에 넣자!</strong>
                <nav className='forNav'>
                    <div className='navBtn'>
                        <figure>
                            <img src='./img/homepage/icon_red_ball.png'/>
                        </figure>
                        <Link to="/quiz">퀴즈 풀러가기</Link>
                    </div>
                    <div className='navBtn'>
                        <figure>
                            <img src='./img/homepage/icon_red_dex.png'/>
                        </figure>
                        <Link to="/pokedex">도감 보러가기</Link>
                    </div>
                    <div className='navBtn'>
                        <figure>
                            <img src='./img/homepage/icon_red_love.png'/>
                        </figure>
                        <Link to="/mypokemon">내 포켓몬&nbsp;&nbsp;</Link>
                    </div>
                </nav>
            </section>
        </>
    )
}

export default Home