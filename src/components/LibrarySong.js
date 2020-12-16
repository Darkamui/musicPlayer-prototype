import React from 'react';

// Container for song to display in sidenav
const LibrarySong = ({song,songs,setCurrentSong,id,setSongs}) => {

    //Changes current song on selection
    const songSelectHandler = () => {
        setCurrentSong(song);
    }
    //Function to change active status of songs when switching
    const newSongs = songs.map((song) => {
        if(song.id === id) {
            return {
                ...song,active:true,
            }
        } else {
            return {
                ...song,active:false,
            }
        }
    })
    //Apply function on switch
    const updatedSongs = () => {
        setSongs(newSongs);
    }

    return (
    <div className={`library-song ${song.active ? 'selected': ""}`} onClick={() => {songSelectHandler();updatedSongs();}}>
            <img alt={song.name} src={song.cover}/>
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
            
        </div>
        
    )
}

export default LibrarySong;