import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getAllRecipes, filterByName, filterByScore, getTypes, filterByDiet } from '../../redux/actions';
import RecipeCard from '../RecipeCard/RecipeCard';
import Paginate from '../Paginate/Paginate';
import SearchBar from '../SearchBar/SearchBar';
import NavBar from '../NavBar/NavBar';

import loading from '../../img/Loading.gif'
import noFood from '../../img/noFood.gif'


const Home = () => {

    //states
    const recipes = useSelector(state => state.recipes)
    const types = useSelector(state => state.types)
    const [currentPage, setCurrentPage] = useState(1);
    const [recipePerPage] = useState(9);

    //pagination
    const indexLastRecipe = currentPage * recipePerPage
    const indexFirstRecipe = indexLastRecipe - recipePerPage
    const currentRecipe = recipes.slice(indexFirstRecipe, indexLastRecipe)

    const dispatch = useDispatch()

    const [orden, setOrden] = useState('')
    const [orden2, setOrden2] = useState('')

    useEffect(() => {
        dispatch(getAllRecipes())
    }, [dispatch])

    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch])

    function handleOrderByName(e){
        e.preventDefault()
        dispatch(filterByName(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`) //al cambiar un estado local se reenderiza la pag
                                               // y ya con eso se actualizan los estados globales
    }

    function handleOrderByScore(e){
        e.preventDefault()
        dispatch(filterByScore(e.target.value))
        setCurrentPage(1)
        setOrden2(`Ordenado ${e.target.value}`) //al cambiar un estado local se reenderiza la pag
                                               // y ya con eso se actualizan los estados globales
    }

    function handleFilterByDiet(e){
        e.preventDefault()
        dispatch(filterByDiet(e.target.value))
        setCurrentPage(1)
    }

    //change page
    const paginat = (pageNumber) => setCurrentPage(pageNumber)
    
    return (
        <div>
            <div className='nav'>
            <NavBar></NavBar>
            <SearchBar></SearchBar>
            </div>
            <div className='homeTitle'>
            <h1>Henry Food</h1>
            <br/>
            <h2>All our Recipes</h2>
            </div>
                <div className='filterOrder'>
                <select className='sytle-select' onChange={(e) => handleOrderByName(e)}>
                    <option value="" >Alphabetical Order</option>
                    <option value="asc">Ascendent</option>
                    <option value="desc">Descendent</option>
                </select>
                <select className='sytle-select' onChange={(e) => handleOrderByScore(e)}>
                    <option value="">Order by Score</option>
                    <option value="high">High Score</option>
                    <option value="desc">Low Score</option>
                </select>
                <select className='sytle-select' onChange={(e) => handleFilterByDiet(e)}>
                <option value="" >Select Diet</option>
                    {types?.map((e, i) => {
                        return <option key={i} value={e.name}>{e.name}</option>
                    })}
                </select>
                </div>

            
            <div className='recipes'>
            {currentRecipe[0] === 'No existe esa receta' ? 
            <div className='div-loading'>
                <h1>No hay recetas con ese nombre</h1>
                <img src={noFood} alt="No Food"/>
            </div> 
            : 
            currentRecipe[0] ? currentRecipe.map(r => {
                return <RecipeCard
                key = {r.id}
                id = {r.id}
                title = {r.title}
                image = {r.image}
                healthScore = {r.healthScore ? r.healthScore : r.healthyLevel}
                spoonacularScore = {r.spoonacularScore}
                diets =  {r.types ? r.types.map(e => e.name) : r.diets}/>
            }):
            <div className='div-loading'>
                <h1>Loading...</h1>
                <img src={loading} alt="Loading"/>
            </div>
            }
            </div>
            
            <Paginate recipePerPage={recipePerPage} totalRecipes={recipes.length} paginat={paginat} />
        </div>
    )
}

export default Home;
