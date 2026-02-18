# Hit songs from 2016-2019 (COMP 4513 A1)
## Overview
This project is an API for querying songs by multiple different options, like artists, songs, playlists, and moods. The data is then returned in JSON format.
## Built With
* Node.js
* Express.js
* Hosted on Render (https://comp4513a1.onrender.com/)
## API Endpoints
| API Endpoint  | Description |
| ------------- | ------------- |
| /api/artists | Returns all data for all artists sorted by artist_name |
| /api/artists/ref | Returns just the specified artist |
| /api/artists/averages/ref | Returns the average values for bpm, energy, danceability, loudness, liveness, valence, duration, acousticness, speechineess, popularity for the specified artist |
| /api/genres | Returns all the genres |
| /api/songs | Returns all data for all the songs sorted by song title |
| /api/songs/sort/order | Returns all the songs sorted by order field. Possible values are: id, title, artist (name), genre (name), year, duration |
| /api/songs/ref | Returns just the specified song |
| /api/songs/search/begin/substring | Returns the songs whose title (case insensitive) begins with the provided substring | 
| /api/songs/search/any/substring | Returns the songs whose title (case insensitive) contains the provided substring |
| /api/songs/search/year/substring | Returns the songs whose year is equal to the provided substring |
| /api/songs/artist/ref | Returns all the songs for the specified artist |
| /api/songs/genre/ref | Returns all the songs for the specified genre | 
| /api/playlists/ref | Returns all the songs for the specified playlist |
| /api/mood/dancing/ref | Returns the top number (determined by ref parameter) of songs sorted by danceability parameter in descending order. If ref is not specified, default is 20 |
| /api/mood/happy/ref | Returns the top number (determined by ref parameter) of songs sorted by valence parameter in descending order. If ref is not specified, default is 20 |
| /api/mood/coffee/ref | Returns the top number (determined by ref parameter) of songs sorted by liveness divided by acousticness in descending order. If ref is not specified, default is 20 |
| /api/mood/studying/ref | Returns the top number (determined by ref parameter) of songs sorted by the product of the energy and speechiness parameters in ascending order. If ref is not specified, default is 20 | 

## Testable API Endpoints
- [/api/artists](https://comp4513a1.onrender.com/api/artists)
- [/api/artists/129](https://comp4513a1.onrender.com/api/artists/129)
- [/api/artists/sdfjkhsdf](https://comp4513a1.onrender.com/api/artists/sdfjkhsdf)
- [/api/artists/averages/129](https://comp4513a1.onrender.com/api/artists/averages/129)
- [/api/genres](https://comp4513a1.onrender.com/api/genres)
- [/api/songs](https://comp4513a1.onrender.com/api/songs)
- [/api/songs/sort/artist](https://comp4513a1.onrender.com/api/songs/sort/artist)
- [/api/songs/sort/year](https://comp4513a1.onrender.com/api/songs/sort/year)
- [/api/songs/sort/duration](https://comp4513a1.onrender.com/api/songs/sort/duration)
- [/api/songs/1010](https://comp4513a1.onrender.com/api/songs/1010)
- [/api/songs/sjdkfhsdkjf](https://comp4513a1.onrender.com/api/songs/sjdkfhsdkjf)
- [/api/songs/search/begin/love](https://comp4513a1.onrender.com/api/songs/search/begin/love)
- [/api/songs/search/begin/sdjfhs](https://comp4513a1.onrender.com/api/songs/search/begin/sdjfhs)
- [/api/songs/search/any/love](https://comp4513a1.onrender.com/api/songs/search/any/love)
- [/api/songs/search/year/2017](https://comp4513a1.onrender.com/api/songs/search/year/2017)
- [/api/songs/search/year/2027](https://comp4513a1.onrender.com/api/songs/search/year/2027)
- [/api/songs/artist/149](https://comp4513a1.onrender.com/api/songs/149)
- [/api/songs/artist/7834562](https://comp4513a1.onrender.com/api/songs/7834562)
- [/api/songs/genre/115](https://comp4513a1.onrender.com/api/songs/genre/115)
- [/api/playlists](https://comp4513a1.onrender.com/api/playlists)
- [/api/playlists/3](https://comp4513a1.onrender.com/api/playlists/3)
- [/api/playlists/35362](https://comp4513a1.onrender.com/api/playlists/35362)
- [/api/mood/dancing/5](https://comp4513a1.onrender.com/api/mood/dancing/5)
- [/api/mood/dancing/500](https://comp4513a1.onrender.com/api/mood/dancing/500)
- [/api/mood/dancing/ksdjf](https://comp4513a1.onrender.com/api/mood/dancing/ksdjf)
- [/api/mood/happy/8](https://comp4513a1.onrender.com/api/mood/happy/8)
- [/api/mood/happy](https://comp4513a1.onrender.com/api/mood/happy)
- [/api/mood/coffee/10](https://comp4513a1.onrender.com/api/mood/coffee/10)
- [/api/mood/studying/15](https://comp4513a1.onrender.com/api/mood/studying/5)
