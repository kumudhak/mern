import React , {useState} from 'react'
import API_BASE_URL from '../config/api';
const SearchBar = ({history}) => {
const [keyword , setKeyword] = useState("")

    const searchSubmit =(e) =>{
        e.preventDefault()

        if(keyword.trim()){
            history.pushState(`${API_BASE_URL}/search/${keyword}`)
        }
        else{
            history.pushState(`${API_BASE_URL}/`)
        }
    }

    return (
    <>
    <form onSubmit={searchSubmit}>
        <div className='input-group'>
        <input 
        type='text'
        id='search_field'
        className='form-control'
        placeholder='Enter the Product Name...'
        onChange={(e) => setKeyword(e.target.value)}
        />
        <div className='input-group-append'>
        <button id='search_btn' className='btn'>
            <i className='fa fa-search' aria-hidden='true'></i>
        </button>
        </div>
        </div>
    </form>
    </>
  )
}

export default SearchBar