import './App.css';
import { Route } from 'react-router-dom';
import Home from "./components/Home/Home"
import RecipeDetail from './components/RecipeDetail/RecipeDetail';
import CreateRecipe from './components/CreateRecipe/CreateRecipe';
import LandingPage from './components/LandingPage/LandingPage'
import UpdateRecipe from './components/UpdateRecipe/UpdateRecipe';


function App() {
  return (
    <div className="App">
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/home' component={Home} />
      <Route exact path='/recipes/detail/:id' component={RecipeDetail} />
      <Route exact path='/create/recipe' component={CreateRecipe} />
      <Route exact path='/update/:id' component={UpdateRecipe} />
    </div>
  );
}

export default App;
