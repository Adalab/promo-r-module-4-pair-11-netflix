const express = require('express');
const cors = require('cors');
const movies = require('./data/movies.json');
const users = require('./data/users.json');
const Database = require('better-sqlite3');

const db = new Database('./src/data/netflix.db', { verbose: console.log})

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
  console.log(req.body);
  const query = db.prepare(
    'SELECT * FROM users WHERE email = ? AND password = ?'
  );
  const userLogin = query.get(req.body.email, req.body.password);
  if (userLogin) {
    const response = {
      success: true,
      userId: userLogin.id,
    };
    res.json(response);
  } else {
    const response = {
      success: false,
      errorMessage: 'Usuaria/o no encontrada/o',
    };
    res.json(response);
  }
});

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
      // const responseFalse = {
      //   success: false,
      //   errorMessage: 'Usuaria/o no encontrada/o',
      // };
      // res.json(responseFalse);
//     }
//   });

  server.post('/sign-up', (req, res) =>{
    const query = db.prepare('INSERT INTO users (email, password, name) VALUES (?,?,?)');
    const result = query.run( req.body.email, req.body.password, 'maricarmen');
    console.log(result);
    res.json(
      {
        "success": true,
        "userId": "nuevo-id-añadido"
      });

  });

server.get('/user/movies', (req, res) =>{
  res.json(
    {
      "success": true,
      "movies": []
    });
});
const staticServerPath = './src/public-react';
server.use(express.static(staticServerPath));

const staticServerPathImage = './src/public-movies-images';
server.use(express.static(staticServerPathImage));
