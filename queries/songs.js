const db = require("../db/dbConfig");


const getAllSongs = async () => {
    try {
      const allSongs = await db.any("SELECT * FROM songs ");
      console.log(allSongs);
      return allSongs;
    } catch (error) {
      return error;
    }
  };

const getSong = async (id) => {
try {
    const oneSong = await db.one("SELECT * FROM songs WHERE id=$1", id);
    return oneSong;
} catch (error) {
    return error;
}
};

const createSong = async (song) => {
try {
    const {name, artist, album, time, is_favorite} = song 
    const newSong = await db.one(
    "INSERT INTO songs (name, artist, album, time, is_favorite) VALUES($1, $2, $3, $4, $5) RETURNING *",
    [name, artist, album, time, is_favorite]
    );
    console.log(newSong);
    return newSong;
} catch (error) {
    return error;
}
};

const deleteSong = async (id) => {
try {
    const deletedSong = await db.one(
    "DELETE FROM songs WHERE id = $1 RETURNING *",
    id
    );
    return deletedSong;
} catch (error) {
    return error;
}
};  

  module.exports = {
      getAllSongs,
      getSong,
      createSong,
      deleteSong
  };