import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {createRecipe, getTypes} from '../../redux/actions';
import NavBar from '../NavBar/NavBar';
// import { useNavigate } from "react-router-dom"


function validate(input) {
    let errors = {};
    if (! input.title) {
        errors.title = "The name of recipe is required";
    } else if (! input.summary) {
        errors.summary = "Summary is required";
    } else if (input.spoonacularScore > 100 || input.spoonacularScore < 0) {
        errors.spoonacularScore = "The score has to be lower than 100";
    } else if (input.healthyLevel > 100 || input.healthyLevel < 0) {
        errors.healthyLevel = "The healt has to be lower than 100";
    } else if (! input.diets.length) {
        errors.diets = "You need select at least a 1 diet to this recipe"
    }
    return errors;
}

const CreateRecipe = () => {
    const dispatch = useDispatch()
    const types = useSelector(state => state.types)
    const [errors, setError] = useState({})

    // const navigate = useNavigate()

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
        setError(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleSubmit(e) {

        let x = parseInt(input.healthyLevel)
        let y = parseInt(input.spoonacularScore)

        if (!input.title || !input.summary) {
            e.preventDefault()
            setError(validate({
                ...input,
                [e.target.name]: e.target.value
            }));

        } else if (!input.diets.length) {
            e.preventDefault()
            setError(validate({
                ...input,
                [e.target.name]: e.target.value
            }));

        } else if (/^\d+$/.test(x) !== true || /^\d+$/.test(y) !== true) {
            e.preventDefault()
            setError({numberError: "Healty score and the Score must be numbers"});

        } else {
            e.preventDefault()
            dispatch(createRecipe(input))
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

    return (
        <div>
            <NavBar></NavBar>
            <div className='homeTitle'>
                <h2>Create your recipe</h2>
            </div>
            <form onSubmit={
                (e) => handleSubmit(e)
            }>

                <div className='firstColumn'>
                    <div>
                        <strong>
                            <p>Recipe Name:</p>
                        </strong>
                        <input type="text"
                            value={
                                input.title
                            }
                            name="title"
                            onChange={
                                (e) => handleChange(e)
                            }/>  
                             {errors.title &&
                        <strong>
                            <p className='error'>
                                {
                                errors.title
                            }</p>
                        </strong>}
                    </div>
                    <div>
                        <strong>
                            <p>Recipe Image:</p>
                        </strong>
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
                        <strong>
                            <p>Recipe summary</p>
                        </strong>
                        <textarea type="text"
                            value={
                                input.summary
                            }
                            name="summary"
                            onChange={
                                (e) => handleChange(e)
                            }/> {
                        errors.summary && <strong>
                            <p className='error'>
                                {
                                errors.summary
                            }</p>
                        </strong>
                    } </div>
                    <div className='lastRow'>
                        <strong>
                            <p>Recipe Score:</p>
                        </strong>
                        <input type="number"
                            value={
                                input.spoonacularScore
                            }
                            name="spoonacularScore"
                            onChange={
                                (e) => handleChange(e)
                            }/> {
                        errors.spoonacularScore && <strong>
                            <p className='error'>
                                {
                                errors.spoonacularScore
                            }</p>
                        </strong>
                    }
                        {
                        errors.numberError && <strong>
                            <p className='error'>
                                {
                                errors.numberError
                            }</p>
                        </strong>
                    } </div>
                </div>
                <div className='secondColumn'>

                    <div>
                        <strong>
                            <p>Recipe Healthy score:</p>
                        </strong>
                        <input type="number"
                            value={
                                input.healthyLevel
                            }
                            name="healthyLevel"
                            onChange={
                                (e) => handleChange(e)
                            }/> {
                        errors.healthyLevel && <strong>
                            <p className='error'>
                                {
                                errors.healthyLevel
                            }</p>
                        </strong>
                    }
                        {
                        errors.numberError && <strong>
                            <p className='error'>
                                {
                                errors.numberError
                            }</p>
                        </strong>
                    }</div>
                    <div>
                        <strong>
                            <p>Steps:</p>
                        </strong>
                        <textarea type="text"
                            value={
                                input.steps
                            }
                            name="steps"
                            onChange={
                                (e) => handleChange(e)
                            }/>
                    </div>
                    <div>
                        <strong>
                            <p>Choose Diets:</p>
                        </strong>

                    </div>
                    <div className='inputDiets'>
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
                        {
                        errors.diets && <strong>
                            <p className='error'>
                                {
                                errors.diets
                            }</p>
                        </strong>
                    } </div>
                </div>
                <div className='submit'>
                    <button type="submit">Create Recipe</button>
                </div>
            </form>
        </div>
    )
}

export default CreateRecipe
