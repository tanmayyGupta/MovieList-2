import React, { useState } from "react";
import MovieListModal from "../components/MovieListModal";

const MainMovieList = (props) => {

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
        // <UpdatedModal/>

        // sessionStorage.setItem('id', responseJson.Plot);
    }

    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-6 m-0 p-0 scroll-smooth">
                {props.movies.map((movie) => (
                    <div className="group">
                    <div className=" mx-auto aspect-w-5 aspect-h-6 w-5/6 md:w-10/12 overflow-hidden rounded-sm bg-gray-200 xl:aspect-w-6 xl:aspect-h-8 cursor-pointer">
                        <img
                            src={movie.Poster}
                            alt={movie.Title}
                            className="h-full w-full object-cover object-center group-hover:opacity-75"

                            onClick={() => {
                                // setIsOpen(true);
                                sessionStorage.setItem('movie', JSON.stringify(movie));
                                // setId(movie.imdbID);
                                // console.log(id);
                                getInfo(movie.imdbID)
                                }
                            }>
                        </img>
                    </div>
                    <h3 className="mt-4 text-sm text-gray-700 ">{movie.Title}</h3>
                    <p className="mt-1 text-lg font-medium text-gray-900">{movie.Year} </p>
                    {/* <p className="mt-1 text-lg font-medium text-gray-900">{rating.score} </p> */}
                    
                    </div>
                ))}
            </div>
            <MovieListModal open = {isOpen} onClose={() => setIsOpen(false)}>{plot}</MovieListModal>

        </>
    )
}

export default MainMovieList;