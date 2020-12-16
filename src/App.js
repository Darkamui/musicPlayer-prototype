import React, { useState} from 'react';
import './styles/app.scss'
import data from './utils'
import Player from './components/Player';
import Song from './components/Song';
import Library from './components/Library';
import Nav from './components/Nav'

function App() {
  //State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus,setLibraryStatus] = useState(false);

  

  return (
    <div className={`App ${libraryStatus ? 'library-active' : ''}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong}></Song>
      <Player 
        currentSong={currentSong}
        setIsPlaying={setIsPlaying}
        isPlaying={isPlaying} songs={songs} setCurrentSong={setCurrentSong}></Player>
      <Library songs={songs} setSongs={setSongs} setCurrentSong={setCurrentSong} libraryStatus={libraryStatus}/>
    </div>
  );
}

export default App;
