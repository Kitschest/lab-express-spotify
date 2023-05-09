// require('dotenv').config();
// const SpotifyWebApi = require('spotify-web-api-node');
// const express = require('express');
// const hbs = require('hbs');

// // require spotify-web-api-node package here:

// const app = express();

// app.set('view engine', 'hbs');
// app.set('views', __dirname + '/views');
// app.use(express.static(__dirname + '/public'));

// // setting the spotify-api goes here:

// const spotifyApi = new SpotifyWebApi({
//     clientId: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET
//   });
  
//   // Retrieve an access token
//   spotifyApi
//     .clientCredentialsGrant()
//     .then(data => spotifyApi.setAccessToken(data.body['access_token']))
//     .catch(error => console.log('Something went wrong when retrieving an access token', error));7

// // Our routes go here:

// app.get('/', (req, res) => {
//     res.render('index');
// });

// app.get('/artist-search', (req, res) => {
//     const artistName = req.query.artistName; // get the value of the artistName query parameter
//     spotifyApi.searchArtists(artistName) // search for the artist
//       .then(data => {
//         const artists = data.body.artists.items; // get the array of artists from the response
//         res.render('artist-search-results', { artists }); // render the artist-search-results view with the list of artists
//       })
//       .catch(err => console.log('The error while searching artists occurred: ', err));
//   });

//   app.get('/albums/:artistId', (req, res) => {
//   const {artistId} = req.params; // get the artist ID from the URL parameter
//   spotifyApi.getArtistAlbums(artistId) // get the artist's albums
//     .then(data => {
//       const albums = data.body.items; // get the array of albums from the response
//       res.render('albums', { albums }); // render the albums view with the list of albums
//     })
//     .catch(err => console.log('The error while searching albums occurred: ', err));
// });

// app.get('/tracks/:albumId', (req, res) => {
//     const albumId = req.params.albumId; // get the album ID from the URL parameter
//     spotifyApi.getAlbumTracks(albumId) // get the album's tracks
//       .then(data => {
//         const tracks = data.body.items; // get the array of tracks from the response
//         res.render('tracks', { tracks }); // render the tracks view with the list of tracks
//       })
//       .catch(err => console.log('The error while searching tracks occurred: ', err));
//   });
  





require('dotenv').config();
const express = require('express');
const hbs = require('hbs');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();
const port = process.env.PORT || 3000;

// Set up the Spotify API client
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

// Set up middleware
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/artist-search', (req, res) => {
  const searchTerm = req.query.artist;
  spotifyApi.searchArtists(searchTerm)
    .then(data => {
      const artists = data.body.artists.items;
      res.render('artist-search-results', { artists });
    })
    .catch(err => console.log('The error while searching artists occurred: ', err));
});

app.get('/albums/:artistId', (req, res) => {
  const artistId = req.params.artistId;
  spotifyApi.getArtistAlbums(artistId)
    .then(data => {
      const albums = data.body.items;
      res.render('albums', { albums });
    })
    .catch(err => console.log('The error while searching albums occurred: ', err));
});

app.get('/tracks/:albumId', (req, res) => {
  const albumId = req.params.albumId;
  spotifyApi.getAlbumTracks(albumId)
    .then(data => {
      const tracks = data.body.items;
      res.render('tracks', { tracks });
    })
    .catch(err => console.log('The error while searching tracks occurred: ', err));
});

// Retrieve an access token and start listening for requests
spotifyApi.clientCredentialsGrant()
  .then(data => {
    spotifyApi.setAccessToken(data.body['access_token']);
    app.listen(port, () => console.log(`App listening on port ${port}`));
  })
  .catch(err => console.log('Error retrieving access token', err));
// app.listen(3000, () => console.log('My Spotify project running on port 3000 🎧 🥁 🎸 🔊'));
