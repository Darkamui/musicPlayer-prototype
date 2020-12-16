import React, {useEffect, useRef, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay,faAngleLeft,faAngleRight,faPause} from "@fortawesome/free-solid-svg-icons";

const Player = ({currentSong, isPlaying, setIsPlaying,songs,setCurrentSong}) => {
    //Ref audio tag
    const audioRef = useRef(null);
    //Event Handlers
    //Play or pause depending on status
    const playSongHandler = () => {
        if(isPlaying){
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
        
    }

    //Get and set currentTime and duration of song
    const timeUpdateHandler = (e) => {
        const current = e.target.currentTime;
        const duration = e.target.duration;
        setSongInfo({...songInfo,currentTime: current, duration})
    };

    //Function to format audio times
    const getTime = (time) => {
        return (
            Math.floor(time/60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        )
    }

    //Update when moving slider
    const dragHandler = (e) => {
        //Update audio tag with current time
        audioRef.current.currentTime = e.target.value;
        //Get and set new current time value from slider
        setSongInfo({...songInfo, currentTime:e.target.value});
    }

    //Change currentsong depending on direction selected with modulus for infinite loop
    const skipTrackHandler = (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        if(direction === 'skip-forward') {
            setCurrentSong(songs[(currentIndex+1) % songs.length]);
        }
        if(direction === 'skip-back') {
            if((currentIndex - 1) % songs.length === -1) {
                setCurrentSong(songs[songs.length-1]);
                return;
            }
            setCurrentSong(songs[(currentIndex-1) % songs.length]);
        }
    }

    //Transition to new song at end of currentsong
    const songEndedHandler = () => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        setCurrentSong(songs[(currentIndex+1) % songs.length]);
        if(isPlaying) audioRef.current.play();
    }
    //State
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0});

    const isInitialMount = useRef(true);
    useEffect(() => {
        if (isInitialMount.current) isInitialMount.current = false;
        else { 
            if(isPlaying){
                audioRef.current.play();
                setIsPlaying(true);
            } else {
                audioRef.current.pause();
                setIsPlaying(false);
            }
        }
    }, [currentSong, setIsPlaying,isPlaying]);
    return (
        <div className="player">

            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <input min={0} max={songInfo.duration || 0} 
                    value={songInfo.currentTime} onChange={dragHandler} type="range"/>
                <p>{getTime(songInfo.duration)}</p>
            </div>

            <div className="play-control">
                <FontAwesomeIcon className="skip-back" onClick={()=>skipTrackHandler('skip-back')} size="2x" icon={faAngleLeft}/>
                <FontAwesomeIcon className="play" size="2x" icon={!isPlaying ? faPlay:faPause} onClick={playSongHandler}/>
                <FontAwesomeIcon className="skip-forward" onClick={()=>skipTrackHandler('skip-forward')}  size="2x" icon={faAngleRight}/>
            </div>
            <audio onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} ref={audioRef} src={currentSong.audio} onEnded={songEndedHandler}></audio>
        </div>
        
    )
}

export default Player;