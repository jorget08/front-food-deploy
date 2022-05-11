import axios from 'axios';

export const GET_ALL_RECIPES = "GET_ALL_RECIPES"
export const GET_RECIPE_DETAIL = "GET_RECIPE_DETAIL"
export const CREATE_RECIPE = "CREATE_RECIPE"
export const GET_ALL_TYPES = "GET_ALL_TYPES"
export const SEARCH_RECIPE = "SEARCH_RECIPE"
export const FILTER_BY_NAME = "FILTER_BY_NAME"
export const FILTER_BY_SCORE = "FILTER_BY_SCORE"
export const FILTER_BY_DIET = "FILTER_BY_DIET"
export const UPDATE_RECIPE = "UPDATE_RECIPE"



export const getAllRecipes = () => {
  return async function (dispatch) {
    return axios.get('https://food-deploy-proyect.herokuapp.com/recipes')
    .then(response => dispatch({type: GET_ALL_RECIPES, payload:response.data}))
    .catch(err => console.error(err))
  };
};

export const getRecipeDetail = (id) => {
return async (dispatch) => {
  return axios.get(`https://food-deploy-proyect.herokuapp.com/recipes/${id}`)
  .then(response => dispatch({type: GET_RECIPE_DETAIL, payload:response.data}))
  .catch(err => console.error(err))
};
};


export const createRecipe = (payload) => {
  return async(dispatch) => {
    return axios.post(`https://food-deploy-proyect.herokuapp.com/recipe`, payload)
    .then(response => dispatch({type: CREATE_RECIPE, payload:response}))
    .catch(err => console.error(err))
  }
};

export const updateRecipe = (id, payload) => {
  return async(dispatch) => {
    return axios.put(`https://food-deploy-proyect.herokuapp.com/recipe/${id}`, payload)
    .then(response => dispatch({type: UPDATE_RECIPE, payload:response}))
    .catch(err => console.error(err))
  }
};

export const getTypes = () => {
  return async function (dispatch) {
    return axios.get('https://food-deploy-proyect.herokuapp.com/types')
    .then(response => dispatch({type: GET_ALL_TYPES, payload:response.data}))
    .catch(err => console.error(err))
  };
};

export const searchByName = (name) => {
  return async function(dispatch){
  return axios.get(`https://food-deploy-proyect.herokuapp.com/recipes?name=${name}`)
    .then(response => dispatch({type: SEARCH_RECIPE, payload:response.data}))
    .catch(err => console.error(err))
  }
}

export const filterByName = (payload) => {  
  return {
    type: 'FILTER_BY_NAME',
    payload,
  }
}

export const filterByScore = (payload) => {  
  return {
    type: 'FILTER_BY_SCORE',
    payload,
  }
}

export const filterByDiet = (payload) => {  
  return {
    type: 'FILTER_BY_DIET',
    payload,
  }
}

// export const deleteProduct = (payload) => {
//   return {
//     type: DELETE_PRODUCT,
//     payload
//   }
// };
