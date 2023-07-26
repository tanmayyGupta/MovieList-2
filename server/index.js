const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = (express());
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const port = 8001||process.env.PORT;
const User = require('./models/user.model.js')
const List = require('./models/list.model.js')
const updatedList = require('./models/updatedlist.model.js');
const { eventNames } = require('./models/user.model.js');

//Middle-ware
app.use(express.json());
app.use(cors());

//Database Connection
mongoose.set("strictQuery", false);
const uri = process.env.MONGODB_URL
mongoose.connect(uri, () => {
    console.log('Mongo Connection Successful');
});


//test
app.get('/', (req, res) => {
    res.send('Helloo world !')
});

//register
app.post('/register', async (req, res) => {
    console.log(req.body);
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10);
        await User.create({
            username : req.body.name,
            email : req.body.email,
            password : newPassword,
        })
        res.json({status : 'ok'});
    } catch (err) {
        res.json({status : 'error', error : err})
    }
});

//login
app.post('/login', async(req, res) => {
    const user = await User.findOne({
        email :  req.body.email,
        // password :  req.body.password,
    })
    if(!user) {
        return res.json({status : 'error', user : false}); 
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if(isPasswordValid) {

        const token = jwt.sign({
                name: user.username,
                email: user.email
            },
            process.env.SECURITY_KEY
        );
        return res.json({status :'ok', user : token});
    }
    else {
        return res.json({status : 'error', user : false});
    }
}); 

//add item to list
app.post('/newentry', async (req, res) => {
    console.log(req.body);
    try {    
        await List.create({
            email: req.body.email,
            Title: req.body.movie.Title,
            year: req.body.movie.Year,
            imdbID: req.body.movie.imdbID,
            type: req.body.movie.Type,
            Poster: req.body.movie.Poster
        })
        res.json({status : 'ok'});
    } catch (err) {
        res.json({status :'error', error : err})
    } 
});

app.post('/newerentry', async (req, res) => {
    console.log(req.body);
    const present = await updatedList.findOne({
        email: req.body.email,
        imdbID: req.body.movie.imdbID,
    })

    if(present) {
        // console.log("movie already present");
        res.json({status :'duplicate'})
    }
    else {
        try {    
            await updatedList.create({
                email: req.body.email,
                listType: req.body.listType,
                userRating: req.body.rating,

                Title: req.body.movie.Title,
                Year: req.body.movie.Year,
                imdbID: req.body.movie.imdbID,
                type: req.body.movie.Type,
                Poster: req.body.movie.Poster
            })
            res.json({status : 'ok'});
        } catch (err) {
            res.json({status :'error', error : err})
        } 
    }
});

//displaying userList: 
// app.post('/getlist', async(req, res) => {
//     console.log(req.body);

//     const movielist = await List.find({
//         email: req.body.email,
//     })

//     if(movielist) {
//         return res.json({movielist})
//     }
//     else {
//         return res.json({status: 'error', user : false})
//     }
// });

//displaying updated-list: 
app.post('/getlist', async(req, res) => {
    console.log(req.body);

    const movielist = await updatedList.find({
        email: req.body.email,
        listType: req.body.listType,
    })

    if(movielist) {
        return res.json({movielist})
    }
    else {
        return res.json({status: 'error', user : false})
    }
});

//removing item from list: 
app.delete('/removeitem', async(req, res) => {
    console.log(req.body);

    // const movielist = await updatedList.findOne({
    //     email: req.body.email,
    //     listType: req.body.listType,
    // })

    // if(movielist) {
    //     return res.json({movielist})
    // }
    // else {
    //     return res.json({status: 'error', user : false})
    // }

    try {
        await updatedList.remove({
            email: req.body.email,
            // listType: req.body.listType, 
            imdbID: req.body.id,      
        })
        res.json({status : 'ok'});
    } catch (err) {
        res.json({status :'error', error : err})
    } 
});


//check
app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});