const express = require('express');
const cors = require('cors');
const movies = require('./data/movies.json');
const users = require('./data/users.json');
const Database = require('better-sqlite3');

const db = new Database('./src/data/movies.db', { verbose: console.log})

// create and config server
const server = express();
server.use(cors());
server.use(express.json());
server.set('view engine', 'ejs');
// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

server.get('/movies', (req, res) => {
const query = db.prepare('SELECT * FROM movies');
const list = query.all();
  res.json({success: true, movies: list});
});
server.get('/movies/:movieId', (req, res) => {
  const paramsId = req.params.movieId;
  const foundMovie = movies.find(
    (movie) => parseInt(movie.id) === parseInt(paramsId)
  );
  res.render('movie', foundMovie);
});

server.post('/login', (req, res) => {
  const query = db.prepare('SELECT * FROM users');
const usersDb = query.all();
console.log(usersDb);
res.json({success: true, movies: usersDb});
//   const userFinded = users.find((user) => {
// return req.body.email === user.email && req.body.password === user.password;
//   });
//     if (userFinded) {
//       const responseSuccess = {
//         success: true,
//         userId: 'id_de_la_usuaria_encontrada',
//       };
//       res.json(responseSuccess);
//     } else {
//       const responseFalse = {
//         success: false,
//         errorMessage: 'Usuaria/o no encontrada/o',
//       };
//       res.json(responseFalse);
//     }
  });

const staticServerPath = './src/public-react';
server.use(express.static(staticServerPath));

const staticServerPathImage = './src/public-movies-images';
server.use(express.static(staticServerPathImage));
