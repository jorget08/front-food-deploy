import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getRecipeDetail } from '../../redux/actions';
import NavBar from '../NavBar/NavBar';
import { Link } from 'react-router-dom';


const RecipeDetail = (props) => {

    const {id} = useParams()
    const recipe = useSelector(state => state.recipeDetail)

    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getRecipeDetail(id))
    }, [dispatch, id])
    return (
        <div className='RecipeDetail'>
            <NavBar></NavBar>
            <h1>Henry Food</h1>
            <br/>
            {recipe.title ? 
            
            typeof recipe.id === 'string' ?

                <div className='detail'>
                    
                    <div className='detailIMG'>
                        <div className='detailGrid'>
                        <h4>{recipe.title}</h4>
                        <img src={recipe.image} alt={recipe.title} />
                        </div>
                        <div className='detailGrid detailScores'>
                            <div className='scores'>
                            <p> <strong>Score: </strong> {recipe.spoonacularScore}</p>
                            <p> <strong>Health Score: </strong>{recipe.healthScore ? recipe.healthScore : recipe.healthyLevel}</p>
                            </div>
                        <p> <strong>Deits:</strong> {recipe.types ? recipe.types.map(e => e.name)?.join(", ") : recipe.diets?.join(", ")}</p>
                        <p> <strong>Dish Types:</strong> {recipe.dishTypes}</p>
                        </div>
                    </div>
                    <div className='detailDesc'>
                        <h5>Description: </h5>
                        <p>{recipe.summary}</p>
                        {recipe.steps && 
                        <div>
                            <h5>Steps: </h5>
                            <p>{recipe.steps}</p>
                        </div>
                        }
                        <div className='update-buttom'>
                        <Link to={`/update/${recipe.id}`}>
                            <div className='submit2'>
                                <button>Update</button>
                            </div>
                        </Link>
                    </div>
                    </div>
                </div>:


                <div className='detail'>
                    <div className='detailIMG'>
                        <div className='detailGrid'>
                        <h4>{recipe.title}</h4>
                        <img src={recipe.image} alt={recipe.title} />
                        </div>
                        <div className='detailGrid detailScores'>
                            <div className='scores'>
                                <h5>Score: {recipe.spoonacularScore}</h5>
                                <h5>Health Score: {recipe.healthScore ? recipe.healthScore : recipe.healthyLevel}</h5>
                            </div>
                        <p> <strong>Deits:</strong> {recipe.types ? recipe.types.map(e => e.name)?.join(", ") : recipe.diets?.join(", ")}</p>
                        <p> <strong>Dish Types:</strong> {recipe.dishTypes}</p>
                        </div>
                    </div>
                    <div className='detailDesc'>
                        <h5>Description: </h5>
                        <p>{recipe.summary}</p>
                        {recipe.steps && 
                        <div>
                            <h5>Steps: </h5>
                            <p>{recipe.steps}</p>
                        </div>
                        }
                        
                    </div>
                </div> : 
                <h1>Loading...</h1>
            }
        </div>
    )//.join(", ")
}

export default RecipeDetail;
