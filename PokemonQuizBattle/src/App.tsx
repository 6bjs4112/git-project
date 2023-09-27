import './App.scss';
import './appResponsive.scss';
import {Route, Routes, Link, HashRouter,BrowserRouter} from 'react-router-dom';
import Home from './Home';
import Quiz from './pages/Quiz';
import Pokedex from './pages/Pokedex';
import Detail from './pages/Detail';
import MyPokemon from './pages/MyPokemon';
import PokemonContext from './PokemonContext';

function App() {

  return (
    <BrowserRouter basename='/3rdPkmQuiz'>
        <PokemonContext>
          <Routes>
            <Route path='/'element={<Home/>}/>
            <Route path='/quiz'element={<Quiz/>}/>
            <Route path='/pokedex'element={<Pokedex/>}/>
            <Route path='/mypokemon'element={<MyPokemon/>}/>
            <Route path='/detail'element={<Detail/>}/>
            <Route path='/:id'element={<Detail/>}/>
          </Routes>
        </PokemonContext>
    </BrowserRouter>
  );
}

export default App;
