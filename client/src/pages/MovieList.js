import React, { useEffect, useState } from "react";
import Modal from "../components/MovieListModal";

const MovieList = (props) => {

    // const [id, setId] = useState('');
    const [plot, setPlot] = useState('');

    const getInfo = async (id) => {
        const url = `http://www.omdbapi.com/?i=${id}&apikey=6148c1c8`;

        const response = await fetch(url);

        const responseJson = await response.json();
        // console.log(id);
        // console.log(responseJson);

        // console.log(responseJson.Plot);

        setPlot(responseJson.Plot);

        // if(responseJson.Search) {
        //     setMovies(responseJson.Search);
        // }
        setIsOpen(true);

        // sessionStorage.setItem('id', responseJson.Plot);
    }

    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            {props.movies.map( (movie, index) => 
                <div className="image-container col-6 col-md-3 p-4">
                    {/* {setId(movie.imdbID)} */}
                    <img 
                        src={movie.Poster} 
                        alt={movie.Title} 
                        className="img-fluid"
                        // onClick={() => props.handleClick(movie)}
                        onClick={() => {
                            // setIsOpen(true);
                            sessionStorage.setItem('movie', JSON.stringify(movie));
                            // setId(movie.imdbID);
                            // console.log(id);
                            getInfo(movie.imdbID)
                            }
                        }>
                    </img>
                    <div className="overlay d-flex align-items-center justify-content-center my-2">
                        {/* <h6>Add to WatchList</h6> */}
                    </div>
                </div>
                
            )}
            <Modal open = {isOpen} onClose={() => setIsOpen(false)}>{plot}</Modal>

        </>
    )
}

export default MovieList;