const express = require('express');
const cors = require('cors');
const movies = require('./data/movies.json');
const users = require('./data/users.json');

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

server.get('/movies', (req, res) => {
  console.log(req);
  console.log(res);
  res.json(movies);
});


server.post('/login', (req, res) =>{

const userFinded = users.find((user) =>{
  if(req.body.email === user.email){
    const responseSuccess= {
      success: true,
      userId: "id_de_la_usuaria_encontrada",
    }
    res.json(responseSuccess);
    } else{
      const responseFalse = {success: false,
  errorMessage: "Usuaria/o no encontrada/o"}
  res.json(responseFalse);
    }
});




});

const staticServerPath = './src/public-react';
server.use(express.static(staticServerPath));

const staticServerPathImage = './src/public-movies-images';
server.use(express.static(staticServerPathImage));

