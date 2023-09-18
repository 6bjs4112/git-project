import './App.scss';
import {Route, Routes, Link, HashRouter} from 'react-router-dom';
import Home from './Home';
import Quiz from './pages/Quiz';
import Pokedex from './pages/Pokedex';
import Detail from './pages/Detail';
import MyPokemon from './pages/MyPokemon';


function App() {

  return (
    <HashRouter>
      <main>
        <Routes>
          <Route path='/'element={<Home/>}/>
          <Route path='/quiz'element={<Quiz/>}/>
          <Route path='/pokedex'element={<Pokedex/>}/>
          <Route path='/mypokemon'element={<MyPokemon/>}/>
          <Route path='/detail'element={<Detail/>}/>
          {/* <Route path='/pokedex/:id'element={<Detail/>}/> */}
        </Routes>
      </main>
    </HashRouter>
  );
}

export default App;
