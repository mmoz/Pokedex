import './App.css';
import { useEffect, useState } from 'react'
import Pokemon from './Components/Pokemon';
import Navbar from './Components/Navbar';

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [dataInpage, setDataInpage] = useState([]);
  const [page, setPage] = useState(0);

  const pagination = () => {
    const pokemonperpage = 45;

    const pages = Math.ceil(pokemon.length / pokemonperpage);
    const newPokemon = Array.from({ length: pages }, (data, index) => {
      const start = index * pokemonperpage;
      return pokemon.slice(start, start + pokemonperpage);
    });

    return newPokemon;
  };

  const handlePage = (index) => {
    setPage(index);
  };

  const fetchData = async () => {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    const convertData = await res.json();
    createPokemon(convertData.results);
  };

  async function createPokemon(result) {
    const pokemonData = await Promise.all(result.map(async (pokemon) => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
      const data = await res.json();
      return data;
    }));
    setPokemon(pokemonData.sort((a,b) => a.id - b.id));
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const paginate = pagination();
    setDataInpage(paginate);
  }, [pokemon]);

  return (
    <div className="App">
      <Navbar/>
      <div className='pokemon-container'>
        {dataInpage[page] && dataInpage[page].map((data, index) => {
          return <Pokemon key={index} {...data} handlePage={handlePage} page={page}/>
        })}
      </div>
      <div className='pagination-container'>
        {dataInpage && dataInpage.map((data,index)=>{
          return <button key={index} onClick={()=>handlePage(index)}>{index+1}</button>
        })}
      </div>
    </div>
  );
}

export default App;
