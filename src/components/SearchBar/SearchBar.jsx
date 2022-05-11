import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { searchByName } from '../../redux/actions'

const SearchBar = () => {

    const dispatch = useDispatch()
    const [name, setName] =  useState("");

    function handleChange(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(searchByName(name))
        setName("")
    }

  return (
    <div>
        <input type="search" placeholder='Search...' value={name} onChange={(e) => handleChange(e)} />
        <button className='search-button' type='submit' onClick={(e) => handleSubmit(e)} >Search</button>
    </div>
  )
}

export default SearchBar