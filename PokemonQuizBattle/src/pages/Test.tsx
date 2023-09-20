import React, { useContext } from 'react'
import { UsePokemonData  } from '../PokemonContext';

type Props = {}

const Test = (props: Props) => {
    const {pkmData, setPkmData} = useContext(UsePokemonData);
    const {pkmSpeciesData, setPkmSpeciesData} = useContext(UsePokemonData);
    console.log(pkmData);
    console.log('위는 기본 아래는 종');
    console.log(pkmSpeciesData);
  return (
    <>
        <div>Test</div>
        <p>
            {pkmData}
        </p>
    </>
  )
}

export default Test