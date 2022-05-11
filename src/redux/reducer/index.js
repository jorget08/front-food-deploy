// Importa las action types acá

import { CLEAR_PAGE, CREATE_RECIPE, GET_ALL_TYPES, GET_ALL_RECIPES, GET_RECIPE_DETAIL, SEARCH_RECIPE, FILTER_BY_NAME, FILTER_BY_SCORE, FILTER_BY_DIET, UPDATE_RECIPE } from "../actions";

const initialState = {
  recipes: [],
  recipeDetail: {},
  types: [],
};

const rootReducer = (state = initialState, action) => {
  switch (
    action.type
    // Acá va tu código:
  ) {
    case GET_ALL_RECIPES:
      return {
        ...state,
        recipes: action.payload,
      }
      
    case GET_RECIPE_DETAIL:
      return {
        ...state,
        recipeDetail: action.payload[0],
      }

    case CREATE_RECIPE:
      return {
        ...state,
      }
    case UPDATE_RECIPE:
      return{
        ...state,
      }
    case GET_ALL_TYPES: 
      return {
        ...state,
        types: action.payload,
      }

    case SEARCH_RECIPE:
      return {
        ...state,
        recipes: action.payload,
      }

    case FILTER_BY_NAME:
      let orderName = action.payload === "asc" ? state.recipes.sort(function(a, b){
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return 1
            }
        if(b.title.toLowerCase() > a.title.toLowerCase()) {
              return -1
            }
             return 0
        }) : state.recipes.sort(function(a, b){
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
             return -1
            }
        if (b.title.toLowerCase() > a.title.toLowerCase()) {
              return 1
            }
            return 0
        })
        return {
          ...state,
          recipes: orderName
        }
    case FILTER_BY_SCORE:
      let orderScore = action.payload === "high" ? state.recipes.sort(function (a, b) {
        if(a.spoonacularScore < b.spoonacularScore){
          return 1
      }
      if (b.spoonacularScore < a.spoonacularScore){
          return -1
      }
      return 0
      }) :
       state.recipes.sort(function (a, b) {
        if(a.spoonacularScore < b.spoonacularScore){
          return -1
      }
      if (b.spoonacularScore < a.spoonacularScore){
          return 1
      }
      return 0
      })
    
      return {
          ...state,
          recipes: orderScore,
  }

   case FILTER_BY_DIET:
     const copyRecipes = state.recipes
     const typeFilter = action.payload === "" ? copyRecipes : copyRecipes.filter(e => {
       return e.diets.includes(action.payload)
       //console.log(e.diets.includes())
     })
     console.log(copyRecipes)
     console.log(typeFilter)
     return {
       ...state,
       recipes: typeFilter
     }
    // case CLEAR_PAGE:
    //   return {
    //     ...state,
    //     productDetail: {}
    //   }

    default:
      return state;
  }

};

export default rootReducer;
