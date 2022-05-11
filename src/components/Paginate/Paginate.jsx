import React from 'react'

const Paginate = ({ recipePerPage, totalRecipes, paginat }) => {

    const pageNumebers = []
    for (let i = 1; i <= Math.ceil(totalRecipes/recipePerPage); i++) {
        pageNumebers.push(i)
    }
  return (
    <div className='paginate'>
        <ul>
            {pageNumebers.map(n => {
                return <li key={n}>
                    <a onClick={() => paginat(n)} href='#'>
                        {n}
                    </a>
                </li>
            })}
        </ul>
    </div>
  )
}

export default Paginate