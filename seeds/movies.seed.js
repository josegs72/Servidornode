const fs = require('fs');
const mongoose = require('mongoose');
const Movie = require('../models/Movie.js')

const DB_URL =  "mongodb+srv://root:1Lor8wFgXCUbCJlF@cluster0.1vr8feq.mongodb.net/?retryWrites=true&w=majority";

    mongoose.connect(DB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(async () => {
        const allMovies = await Movie.find();
        if (allMovies.length){
            await Movie.collection.drop();
        }
    }).catch(err =>{
        console.log(`Ha habido un error eliminando datos: ${err}`);
    }) 
    .then(async () => {
            const data = fs.readFileSync('./seeds/db/movies.json');
            const parsedData = JSON.parse(data);
            const movieDocs = parsedData.map((movies) => {
                return new Movie(movies);
            });
            await Movie.insertMany(movieDocs);
         })
         .catch((err) => {
            console.log (`Ha habido un error añadiendo los elementos a la base de datos: ${err}`);
         })

         .finally(() => mongoose.disconnect());

