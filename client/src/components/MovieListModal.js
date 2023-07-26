import React, { useState } from 'react'
import ReactDOM from "react-dom";
import jwt_decode from'jwt-decode';


function Modal({open, children, onClose}, props) {
    const [rating, setRating]  = useState();
    const [listType, setListType] = useState(0);
    // const [title, setTitle] = useState('');
    const obj = sessionStorage.getItem('movie');
    const movie = JSON.parse(obj);

    async function addToList(event) {
        event.preventDefault();

        if ( (listType === 1) && (rating < 1 || rating> 10) ) {
            alert("Enter Rating between 1 & 10");
            setRating(0);
            return;
        } 
        const token = sessionStorage.getItem('token');
        const user = jwt_decode(token);
        const email = user.email;

        // const obj = sessionStorage.getItem('movie');
        // const movie = JSON.parse(obj);
        // console.log(movie);
        // setTitle(movie.Title);
        // console.log(obj);

        const response = await fetch('https://movie-list-inky.vercel.app/newerentry/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email, listType, rating, movie,
            }),
        })

        const data = await response.json();
        console.log(data);
        
        let alertmessage = '';
        if (listType === 1) {
            alertmessage = "Watched";
        } else {
            alertmessage = "Plan to Watch";
        }

        if(data.status === 'ok') {
            alert(movie.Title + " now added to your " + alertmessage + " list !");
        }
        else if(data.status === 'duplicate') {
            alert(movie.Title + " is already in your list !");
        }   
        
        setRating(0);
        setListType(0);
        onClose();
    }
    function closeModal () {
        setRating(0);
        setListType(0);
        onClose();
    }
    if(!open) return null; // for modal opening & closing

    return ReactDOM.createPortal(
        <>
            <div className='z-[999] fixed inset-0 backdrop-blur-sm bg-[#000000b3]' onClick={closeModal}></div>

            <div className="pt-3 w-10/12 md:w-8/12 lg:w-1/3 z-[1000] fixed top-1/2 left-1/2 bg-white drop-shadow-xl overflow-hidden rounded-md -translate-x-1/2 -translate-y-1/2">
         
                <div className="flex align-top justify-between px-3 font-bold text-gray-900 leading:7 md:leading-9">
                    <span>{movie.Title}</span>
                    <input type="submit" value="X" onClick={closeModal}/>
                </div>

                    <div className='pb-4 2 w-3/4 mx-auto'>
                    {children}
                    </div>
                                
                 <div className='flex justify-evenly bg-gray-100 align-middle py-3 px-3 md:px-1'>
                    <form onSubmit={addToList} className="flex justify-start gap-1">
                        <input 
                            type="text" 
                            placeholder="Rating(1 - 10)" 
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            autoFocus
                            required
                            className='w-1/4'/>
                        <input type="submit" value="Watched" onClick={() => {setListType(1)}}
                        className=" bg-[#3173bf] text-white px-2 md:px-3  rounded-md text-sm font-medium no-underline hover:opacity-90"/>
                    </form>
                

                <input type="submit" value="Plan to Watch" onClick={addToList} 
                className="bg-[#3173bf] text-white px-2 md:px-3  rounded-md text-sm font-medium no-underline hover:opacity-90"/>
                </div>
            </div>
           
        </>,
        document.getElementById('portal')
    )
}

export default Modal;