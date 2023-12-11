import React, {useState} from 'react';
import './AddMovie.css';


function AddMovie(){
    const [searchTerm, setSearchTerm] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        
    }
    return(
        <div>
            <form onSubmit={()=>handleSubmit()} id="add-movie-form">
                <input type="text" placeholder="Search for a movie" id="movie-searchbox"/>
                <button type='submit'>Search</button>
            </form>
        </div>
    )
}

export default AddMovie;