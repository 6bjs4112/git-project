import { createContext, useState, useEffect } from 'react';
import { Pokemon } from './types';
import krTypeData from './typeData.json'
import axios from 'axios';
export const usePokemonData =  createContext<any>([]);

const PokemonContext:any = ({ children }:any) => {
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
    //데이터 뽑아오고 이름 한국어로 바꾼 배열 만들기
    useEffect(() => {
        const fetchData = async () => {
        const allPokemonData = [];
            for (let i = 1; i <= 151; i++) {
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
    }, []);
    console.log(pokemonData);

    return (
        <PokemonContext.Provider value={{pokemonData, setPokemonData}}>
            {children}
        </PokemonContext.Provider>
    )
}
export default PokemonContext ;


