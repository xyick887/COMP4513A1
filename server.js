const express = require('express');
const supa = require('@supabase/supabase-js');
const app = express();

const supaUrl = 'https://blwpkrgqtoafsztdevub.supabase.co';
const supaAnonKey = 'sb_publishable_MsP-GxWVA-Tqy8xeAHJPHw_v01dD8lZ';

const supabase = supa.createClient(supaUrl, supaAnonKey); 

const notFound = (res, message = "No results found") => {
  return res.status(404).json({ error: message });
};

// Routes

// Returns all artists
app.get("/api/artists", async (req, res) => {
    const { data, error } = await supabase
    .from("artists")
    .select(`*, types!inner(type_name)`)
    .order("artist_name", { ascending: true });
    
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// Returns a single artist based on specified ID
app.get("/api/artists/:id", async (req, res) => {
    const { data, error } = await supabase
    .from("artists")
    .select(`*, types!inner(type_name)`)
    .eq("artist_id", req.params.id);
    
    if (error) return res.status(500).json({ error: error.message });
    if (!data || data.length === 0) return notFound(res, "No results for the specified ID");
    res.json(data);
});

// Returns all genres
app.get("/api/genres", async (req, res) => {
    const { data, error } = await supabase
    .from("genres")
    .select("*");
    
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// Returns all songs
app.get("/api/songs", async (req, res) => {
    const { data, error } = await supabase
    .from("songs")
    .select(`
        *,
        artist:artists(artist_id, artist_name),
        genre:genres(genre_id, genre_name)
    `)
    .order("title", { ascending: true });
    
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// Returns a single song based on specified ID
app.get("/api/songs/:id", async (req, res) => {
    const { data, error } = await supabase
    .from("songs")
    .select(`
        *,
        artist:artists(artist_id, artist_name),
        genre:genres(genre_id, genre_name)
    `)
    .eq("song_id", req.params.id);
    
    if (error) return res.status(500).json({ error: error.message });
    if (!data || data.length === 0) return notFound(res, "No results for the specified ID");
    res.json(data);
});

// Returns all songs that start with specified substring
app.get("/api/songs/search/begin/:substring", async (req, res) => {
    const { data, error } = await supabase
    .from("songs")
    .select(`
        *,
        artist:artists(artist_id, artist_name),
        genre:genres(genre_id, genre_name)
    `)
    .ilike("title", `${req.params.substring}%`);
    
    if (error) return res.status(500).json({ error: error.message });
    if (!data || data.length === 0) return notFound(res, "No results for the specified substring");
    res.json(data);
});

// Returns all songs that contain specified substring
app.get("/api/songs/search/any/:substring", async (req, res) => {
    const { data, error } = await supabase
    .from("songs")
    .select(`
        *,
        artist:artists(artist_id, artist_name),
        genre:genres(genre_id, genre_name)
    `)
    .ilike("title", `%${req.params.substring}%`);
    
    if (error) return res.status(500).json({ error: error.message });
    if (!data || data.length === 0) return notFound(res, "No results for the specified substring");
    res.json(data);
});

// Returns all songs released in specified year
app.get("/api/songs/search/year/:year", async (req, res) => {
    const { data, error } = await supabase
    .from("songs")
    .select(`
        *,
        artist:artists(artist_id, artist_name),
        genre:genres(genre_id, genre_name)
    `)
    .eq("year", req.params.year);  
    
    if (error) return res.status(500).json({ error: error.message });
    if (!data || data.length === 0) return notFound(res, "No results for the specified year");
    res.json(data);
});

// Returns all songs written by specified artist 
app.get("/api/songs/artist/:id", async (req, res) => {
    const { data, error } = await supabase
    .from("songs")
    .select(`
        *,
        artist:artists(artist_id, artist_name),
        genre:genres(genre_id, genre_name)
    `)
    .eq("artist_id", req.params.id);
    
    if (error) return res.status(500).json({ error: error.message });
    if (!data || data.length === 0) return notFound(res, "No results for the specified ID");
    res.json(data);
});

// Returns all songs under specified genre
app.get("/api/songs/genre/:id", async (req, res) => {
    const { data, error } = await supabase
    .from("songs")
    .select(`
        *,
        artist:artists(artist_id, artist_name),
        genre:genres(genre_id, genre_name)
    `)
    .eq("genre_id", req.params.id);
    
    if (error) return res.status(500).json({ error: error.message });
    if (!data || data.length === 0) return notFound(res, "No results for the specified ID");
    res.json(data);
});

// Returns top 20 songs for dancing
app.get("/api/mood/dancing", async (req, res) => {
    const { data, error } = await supabase
    .from("songs")
    .select(`
        *,
        artist:artists(artist_id, artist_name),
        genre:genres(genre_id, genre_name)
    `)
    .order("danceability", { ascending: false })
    .limit(20);
    
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// Returns top specified number songs for dancing
app.get("/api/mood/dancing/:count", async (req, res) => {
    const limit = getLimit(req.params.count);
    if (limit === null) {
        return res.status(400).json({ error: "Invalid limit parameter" });
    }
    const { data, error } = await supabase
    .from("songs")
    .select(`
        *,
        artist:artists(artist_id, artist_name),
        genre:genres(genre_id, genre_name)
    `)
    .order("danceability", { ascending: false })
    .limit(limit);
    
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// Returns top 20 songs for happy
app.get("/api/mood/happy/", async (req, res) => {
  const { data, error } = await supabase
    .from("songs")
    .select(`
        *,
        artist:artists(artist_id, artist_name),
        genre:genres(genre_id, genre_name)
    `)
    .order("valence", { ascending: false })
    .limit(20);
    
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// Returns top specified number songs for happy
app.get("/api/mood/happy/:count", async (req, res) => {
    const limit = getLimit(req.params.count);
    if (limit === null) {
        return res.status(400).json({ error: "Invalid limit parameter" });
    }
    const { data, error } = await supabase
    .from("songs")
    .select(`
        *,
        artist:artists(artist_id, artist_name),
        genre:genres(genre_id, genre_name)
    `)
    .order("valence", { ascending: false })
    .limit(limit);
    
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// Returns top 20 songs for coffee
// Based on liveness / acousticness
app.get("/api/mood/coffee/", async (req, res) => {
    const limit = 20;
    const { data, error } = await supabase
    .from("songs")
    .select(`
        *,
        artist:artists(artist_id, artist_name),
        genre:genres(genre_id, genre_name)
    `)
    .gt("acousticness", 0);
  
    if (error) return res.status(500).json({ error: error.message });
    if (!data || data.length === 0) return notFound(res);
    
    // Calculate coffee score (liveness / acousticness)
    const scored = data
    .map(song => ({ // iterate each song and create new array
        ...song, // copy the song from old to new
        coffeeScore: song.liveness / song.acousticness // add coffee score
    }))
    .sort((a, b) => b.coffeeScore - a.coffeeScore) // sort in ascending
    .slice(0, limit); // slice to return limit
    
    res.json(scored);
});

// Returns top specified number songs for coffee
// Based on liveness / acousticness
app.get("/api/mood/coffee/:count", async (req, res) => {
    const limit = req.params.count;
    if (limit === null) {
        return res.status(400).json({ error: "Invalid limit parameter" });
    }
    const { data, error } = await supabase
    .from("songs")
    .select(`
        *,
        artist:artists(artist_id, artist_name),
        genre:genres(genre_id, genre_name)
    `)
    .gt("acousticness", 0);
  
    if (error) return res.status(500).json({ error: error.message });
    if (!data || data.length === 0) return notFound(res);
    
    // Calculate coffee score (liveness / acousticness)
    const scored = data
    .map(song => ({ // iterate each song and create new array
        ...song, // copy the song from old to new
        coffeeScore: song.liveness / song.acousticness // add coffee score
    }))
    .sort((a, b) => b.coffeeScore - a.coffeeScore) // sort in ascending
    .slice(0, limit); // slice to return limit
    
    res.json(scored);
});

// Returns top 20 songs for studying
// Based on energy * speechiness
app.get("/api/mood/studying/", async (req, res) => {
    const limit = 20;
    const { data, error } = await supabase
    .from("songs")
    .select(`
        *,
        artist:artists(artist_id, artist_name),
        genre:genres(genre_id, genre_name)
    `);
  
    if (error) return res.status(500).json({ error: error.message });
    if (!data || data.length === 0) return notFound(res);
    
    // Calculate studying score (energy * speechiness)
    const scored = data
    .map(song => ({ // iterate each song and create new array
        ...song, // copy the song from old to new
        studyingScore: song.energy * song.speechiness // add studying score
    }))
    .sort((a, b) => a.studyingScore - b.studyingScore) // sort in descending
    .slice(0, limit); // slice to return limit
    
    res.json(scored);
});

// Returns top specified number songs for studying
// Based on energy * speechiness
app.get("/api/mood/studying/:count", async (req, res) => {
    const limit = req.params.count;
    if (limit === null) {
        return res.status(400).json({ error: "Invalid limit parameter" });
    }
    const { data, error } = await supabase
    .from("songs")
    .select(`
        *,
        artist:artists(artist_id, artist_name),
        genre:genres(genre_id, genre_name)
    `);
  
    if (error) return res.status(500).json({ error: error.message });
    if (!data || data.length === 0) return notFound(res);
    
    // Calculate studying score (energy * speechiness)
    const scored = data
    .map(song => ({ // iterate each song and create new array
        ...song, // copy the song from old to new
        studyingScore: song.energy * song.speechiness // add studying score
    }))
    .sort((a, b) => a.studyingScore - b.studyingScore) // sort in descending
    .slice(0, limit); // slice to return limit
    
    res.json(scored);
});

// Returns the averages of a specifed artist
app.get("/api/artists/averages/:id", async (req, res) => {   
    const { data, error } = await supabase
    .from("songs")
    .select(`
        bpm,
        energy,
        danceability,
        loudness,
        liveness,
        valence,
        duration,
        acousticness,
        speechiness,
        popularity
    `)
    .eq("artist_id", req.params.id);
    
    if (error) return res.status(500).json({ error: error.message });
    if (!data || data.length === 0) return notFound(res, "No results for the specified ID");
    
    // averaging all of the information
    const count = data.length;
    const averages = { // iterates through each song and adds the speciied value, then divides by total number of songs
        average_bpm: (data.reduce((sum, song) => sum + song.bpm, 0)) / count,
        average_energy: (data.reduce((sum, song) => sum + song.energy, 0)) / count,
        average_danceability: (data.reduce((sum, song) => sum + song.danceability, 0)) / count,
        average_loudness: (data.reduce((sum, song) => sum + song.loudness, 0)) / count,
        average_liveness: (data.reduce((sum, song) => sum + song.liveness, 0)) / count,
        average_valence: (data.reduce((sum, song) => sum + song.valence, 0)) / count,
        average_duration: (data.reduce((sum, song) => sum + song.duration, 0)) / count,
        average_acousticness: (data.reduce((sum, song) => sum + song.acousticness, 0)) / count,
        average_speechiness: (data.reduce((sum, song) => sum + song.speechiness, 0)) / count,
        average_popularity: (data.reduce((sum, song) => sum + song.popularity, 0)) / count
    };
    
    res.json(averages);
});

// Returns data of all playlists
app.get("/api/playlists", async (req, res) => {
    const { data, error } = await supabase
    .from("playlists")
    .select("playlist_id")
    .order("playlist_id", { ascending: true });

    if (error) return res.status(500).json({ error: error.message });
  
    // Convert to { playlist_id: _, song_count: 0 } so it makes more sense 
    const playlistMap = {};
    data.forEach(song => {
    if (!playlistMap[song.playlist_id]) {
        playlistMap[song.playlist_id] = { playlist_id: song.playlist_id, song_count: 0 };
    }
    playlistMap[song.playlist_id].song_count++;
    });
  
    res.json(Object.values(playlistMap));
});

// Returns contents of a specified playlist
app.get("/api/playlists/:id", async (req, res) => {
    const { data, error } = await supabase
    .from("playlists")
    .select(`
        playlist_id,
        songs!inner(
            song_id,
            title,
            year,
            artists!inner(artist_name),
            genres!inner(genre_name)
        )
    `)
    .eq("playlist_id", req.params.id);
  
    if (error) return res.status(500).json({ error: error.message });
    if (!data || data.length === 0) return notFound(res, "No results for the specified ID");
    res.json(data);
});

// Returns all songs sorted by the specified sort parameter
app.get("/api/songs/sort/:sort", async (req, res) => {
    const sortBy = req.params.sort;

    const validSorts = {
        id: "song_id",
        title: "title",
        year: "year",
        duration: "duration"
    };

    let query = supabase
    .from("songs")
    .select(`
        *,
        artist:artists(artist_id, artist_name),
        genre:genres(genre_id, genre_name)
    `);

    if (sortBy === "artist") {
        query = query.order("artist_name", {
        referencedTable: "artists",
        ascending: true,
        });
    } else if (sortBy === "genre") {
        query = query.order("genre_name", {
        referencedTable: "genres",
        ascending: true,
        });
    } else if (validSorts[sortBy]) {
        query = query.order(validSorts[sortBy], { ascending: true });
    } else {
        return notFound(res, "Invalid sort parameter");
    }

    const { data, error } = await query;
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// handles NaN, default 20 as well
const getLimit = (value) => {
    let num = parseInt(value);
    if (isNaN(num)) {
        return null;
    }
    if (num < 1 || num > 20) {
        return 20;
    }
    return num;
};

app.listen(8080, () => {
    console.log('listening on port 8080');
    console.log('http://localhost:8080/api/');
});
