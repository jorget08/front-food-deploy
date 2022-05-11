import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {updateRecipe, getRecipeDetail, getTypes} from '../../redux/actions';
import NavBar from '../NavBar/NavBar';




function validate(input) {
    let errors = {};
    if (input.spoonacularScore > 100 || input.spoonacularScore < 0) {
        errors.spoonacularScore = "The score has to be lower than 100";
    } else if (input.healthyLevel > 100 || input.healthyLevel < 0) {
        errors.healthyLevel = "The healt has to be lower than 100";
    }
    return errors;
}


function UpdateRecipe(props) {

    const {id} = useParams()
    const recipe = useSelector(state => state.recipeDetail)
    const types = useSelector(state => state.types)
    const [errors, setError] = useState({})
    const dispatch = useDispatch()


    const [input, setInput] = useState({
        title: "",
        summary: "",
        image: "",
        spoonacularScore: 0,
        healthyLevel: 0,
        steps: "",
        diets: []
    })

    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch]);


    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setError(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    }

    function handleSelect(e) {
        setInput({
            ...input,
            diets: [
                ...input.diets,
                e.target.value
            ]
        })
    }

    function handleSubmit(e) {
        let x = parseInt( input.healthyLevel)
        let y = parseInt( input.spoonacularScore)

        if (input.spoonacularScore > 100 || input.spoonacularScore < 0) {
            e.preventDefault()
            setError(validate({
                ...input,
                [e.target.name]: e.target.value
            }))

        } else if (input.healthyLevel > 100 || input.healthyLevel < 0) {
            e.preventDefault()
            setError(validate({
                ...input,
                [e.target.name]: e.target.value
            }))

        } else if(/^\d+$/.test(x) !==true || /^\d+$/.test(y) !== true) {
            e.preventDefault()
            setError({
                numberError: "Healty score and the Score must be numbers"
            });

        } else {
            e.preventDefault()
            dispatch(updateRecipe(recipe.id, input))
            alert('Recipe sucessfuly created!!!')
            setInput({
                title: "",
                summary: "",
                image: "",
                spoonacularScore: 0,
                healthyLevel: 0,
                steps: "",
                diets: []
            })
            // navigate("/home")
        }
    }

    useEffect(() => {
        dispatch(getRecipeDetail(id))
    }, [dispatch, id]
    );

    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch]);

  return (
    <div>
            <NavBar></NavBar>
            <div className='homeTitle'>
                    <h2>Update your recipe</h2>
                </div>
            {recipe.title ? 
            <form onSubmit={
                (e) => handleSubmit(e)
            }>
                <div className='firstColumn'>
                    <div>
                        <p><strong>Recipe Name:</strong></p>
                        <p className='prev-data'>Previous data: </p><p> {recipe.title}</p>
                        <input type="text"
                            value={
                                input.title
                            }
                            name="title"
                            onChange={
                                (e) => handleChange(e)
                            }/> </div>
                            <div>
                    <strong><p>Recipe Image:</p></strong>
                        <input type="text"
                            value={
                                input.image
                            }
                            name="image"
                            onChange={
                                (e) => handleChange(e)
                            }/> 
                    </div>
                    <div>
                        <p><strong>Recipe summary</strong></p>
                        <p className='prev-data'>Previous data:</p><p> {recipe.summary}</p>
                        <textarea type="text"
                            value={
                                input.summary
                            }
                            name="summary"
                            onChange={
                                (e) => handleChange(e)
                            }/> </div>
                    <div className='lastRow'>
                        <p><strong>Recipe Score:</strong></p>
                        <p className='prev-data'>Previous data: </p><p> {recipe.spoonacularScore}</p>
                        <input type="number"
                            value={
                                input.spoonacularScore
                            }
                            name="spoonacularScore"
                            onChange={
                                (e) => handleChange(e)
                            }/> {
                        errors.spoonacularScore && <strong><p className='error'> {
                            errors.spoonacularScore
                        }</p></strong>
                    } {
                        errors.numberError && <strong><p className='error'> {
                            errors.numberError
                        }</p></strong>
                    }
                        <p className='tip'>To update the score to 0 put 00</p>
                    </div>
                </div>
                <div className='secondColumn'>

                <div>
                    <p><strong>Recipe Healthy score:</strong></p>
                    <p className='prev-data'>Previous data: </p><p> {recipe.healthyLevel}</p>
                    <input type="number"
                        value={
                            input.healthyLevel
                        }
                        name="healthyLevel"
                        onChange={
                            (e) => handleChange(e)
                        }/> {
                    errors.healthyLevel && <strong><p className='error'>{
                        errors.healthyLevel
                    }</p></strong>
                } {
                    errors.numberError && <strong><p className='error'> {
                        errors.numberError
                    }</p></strong>
                }
                        <p className='tip'>To update the score to 0 put 00</p>
                </div>
                <div>
                    <p><strong>Steps</strong></p>
                    <p className='prev-data'>Previous data: </p><p> {recipe.steps}</p>
                    <textarea type="text"
                        value={
                            input.steps
                        }
                        name="steps"
                        onChange={
                            (e) => handleChange(e)
                        }/>
                </div>
                <div className='inputDiets'>
                    <p><strong>Choose Diets</strong></p>
                    <p className='prev-data'>Previous data:</p> <p>{recipe.types ? recipe.types.map(e => e.name)?.join(", ") : recipe.diets?.join(", ")}</p>
                    <select name="diets"
                        value={
                            input.diets
                        }
                        multiple
                        onChange={
                            (e) => handleSelect(e)
                    }>
                        {
                        types.map((t, index) => {
                            return <option key={index}
                                value={
                                    t.name
                            }>
                                {
                                t.name
                            }</option>
                    })
                    } </select>
                </div>
                </div>
                <div className='submit'>
                    <button type="submit">Update Recipe</button>
                </div>
            </form>
            :
            <h1>Loading...</h1>
            }
        </div>
  )
}

export default UpdateRecipe;