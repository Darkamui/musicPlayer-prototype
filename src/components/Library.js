import React from 'react';
import LibrarySong from './LibrarySong';

//SideNav to display list of songs 

const Library = ({songs, setCurrentSong,setSongs,libraryStatus}) => {
    return(
        //if libraryStatus add className active-library else ''
        <div className={`library ${libraryStatus ? 'active-library':''}`}>
            <h2>Library</h2>
            <div className="library-songs">
                 {/*Loop through songs array to display list*/}
                {songs.map(song => 
                    <LibrarySong songs={songs} song={song} 
                    id={song.id} setCurrentSong={setCurrentSong} setSongs={setSongs} key={song.id}/>)}
            </div>
        </div>
    )
}

export default Library;