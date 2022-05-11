import React from 'react';
import { Link } from 'react-router-dom';


const RecipeCard = ({id, title, image, healthScore, spoonacularScore, diets}) => {
    
    return(
        <div className='recipeCard'>
            
                <Link to={`/recipes/detail/${id}`}>
                    <div>
                        <h4>{title}</h4>
                        <img src={image} alt={title} />
                        <p><strong>Healthy:</strong> {healthScore}</p>
                        <p><strong>Score:</strong> {spoonacularScore}</p>
                        <p><strong>Diet:</strong> {diets.join(", ")}</p>
                    </div>
                </Link>
        </div>
    )
}


export default RecipeCard;