import { createContext, useState, useEffect } from 'react';
import { Pokemon } from './types';
import krTypeData from './typeData.json'
import axios from 'axios';
export const UsePokemonData =  createContext<any>([]);

const PokemonContext:any = ({ children }:any) => {


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

    const fetchData = async (id:any) => {
        const allPokemonData = [];
        const [basicData, speciesData] = await Promise.all([
            pkmDB.get(`/pokemon/${id}`),//basic
            pkmDB.get(`/pokemon-species/${id}`),//species
        ]);
        const typeName = basicData.data.types;
        const krTypeInfo = getKrType(typeName);
        
        //도감설명 한글 데이터만 가져오기
        const krFlavorText = speciesData.data.flavor_text_entries
            .filter((entry: any) => entry.language.name === 'ko');
    
        const pokemon: Pokemon = {
            name: basicData.data.name,
            speciesData: speciesData.data,
            ...basicData.data,
            krType: krTypeInfo,
            krDexText: krFlavorText,
        };
        allPokemonData.push(pokemon);
        setPokemonData(allPokemonData);
    };
    useEffect(() => {
        
    }, []);
    return (
        <UsePokemonData.Provider value={{pokemonData, fetchData}}>
            {children}
        </UsePokemonData.Provider>
    )
}
export default PokemonContext ;


