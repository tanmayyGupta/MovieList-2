import React, { useEffect, useState } from "react";
import SearchBox from "../components/SearchBox";
import MainMovieList from "./MainMovieList";

function Search () {

    const [movies, setMovies] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const getMovieRequest = async () => {
        const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=6148c1c8`;

        const response = await fetch(url);
        const responseJson = await response.json();

        if(responseJson.Search) {
            setMovies(responseJson.Search);
        }
    }

    useEffect(() => {
        getMovieRequest(searchValue);
        // eslint-disable-next-line
    }, [searchValue]);

    return (
        <>
            <div className="container-fluid">
                <h3 className="text-gray-700 pt-8 pb-2 md:pt-16 md:pb-2">Search for any Movie/Series Title</h3>
                <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
            </div>
            <div className="d-flex row">
                <MainMovieList movies = {movies}/>
            </div>
        </>
    )
}

export default Search;