import React, { useState } from 'react'
import ReactDOM from "react-dom";
import jwt_decode from'jwt-decode';


const MODAL_STYLES = {
    position: 'fixed',
    width: '50%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '50px',
    zIndex: 1000
}
const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1000
}

function YourProfileModal({open, children, onClose}, props) {
    const [rating, setRating]  = useState(0);
    const [listType, setListType] = useState(0);
    const obj = sessionStorage.getItem('movie');
    const movie = JSON.parse(obj);

    const token = sessionStorage.getItem('token');
    const user = jwt_decode(token);
    const email = user.email;

    async function removeItem() {
        // const obj = sessionStorage.getItem('movie');
        // const movie = JSON.parse(obj);
        // console.log(movie);
        // setTitle(movie.Title);
        // console.log(obj);
        const id = movie.imdbID;

        const response = await fetch('http://localhost:8001/removeitem', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email, id,
            }),
        })

        const data = await response.json();
        console.log(data);

        if(data.status === 'ok') {
            alert("User-List updated successfully!")
        }
        else {
            alert("try again");
        }
        
        setRating(0);
        setListType(0);
        window.location.reload();
        onClose();
    }

    //first removes existing entry then creates a new entry.
    async function addToList(event) {
        event.preventDefault();

        removeItem();

        if ( (listType === 1) && (rating < 1 || rating> 10) ) {
            alert("Enter Rating between 1 & 10");
            setRating(0);
            return;
        } 
        // const obj = sessionStorage.getItem('movie');
        // const movie = JSON.parse(obj);
        // console.log(movie);
        // setTitle(movie.Title);
        // console.log(obj);

        const response = await fetch('http://localhost:8001/newerentry/', {
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
        
        // let alertmessage = '';
        // if (listType === 1) {
        //     alertmessage = "Watched";
        // } else {
        //     alertmessage = "Plan to Watch";
        // }

        if(data.status === 'ok') {
            // alert(movie.Title + " now added to your Watched list !");
        }
        // else if(data.status === 'duplicate') {
        //     alert(movie.Title + " is already in your list !");
        // }   
        
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
            {/* <div style={OVERLAY_STYLES} className=" z-[1000] fixed inset-0 backdrop-blur-sm bg-[#000000b3]" onClick={onClose}></div> */}
            <div className='z-[999] fixed inset-0 backdrop-blur-sm bg-[#000000b3]' onClick={closeModal}></div>

            {/* <div style={MODAL_STYLES} className=" bg-white shadow-lg rounded-md ease duration-150 items-center justify-center align-middle flex"> */}
            <div className="pt-3 w-10/12 md:w-8/12 lg:w-1/3 z-[1000] fixed top-1/2 left-1/2 bg-white drop-shadow-xl overflow-hidden rounded-md -translate-x-1/2 -translate-y-1/2">
         
                <div className="flex align-top justify-between px-3 font-bold text-gray-900 leading:7 md:leading-9">
                    {/* {title} */}
                    <span>{movie.Title}</span>
                    <input type="submit" value="X" onClick={closeModal}/>
                </div>

                {/* <div className=" bg-lime-50 shadow-md rounded-sm items-center justify-center align-middle p-4 m-2"> */}
                    <div className='pb-4 2 w-3/4 mx-auto'>
                    {children}
                    </div>
                {/* </div> */}
                
                
                 {/* onClick={() => props.handleClick(movie)} */}
                 <div className='flex justify-evenly bg-gray-100 align-middle py-3 px-3 md:px-1'>
                    <form onSubmit={addToList}  className="flex justify-start gap-1">
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
                

                <input type="submit" value="Remove" onClick={removeItem} 
                className="bg-[#3173bf] text-white px-2 md:px-3  rounded-md text-sm font-medium no-underline hover:opacity-90"/>
                </div>
            </div>
           
        </>,
        document.getElementById('portal')
    )
}

export default YourProfileModal;