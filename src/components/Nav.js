import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMusic} from "@fortawesome/free-solid-svg-icons";

//Navbar

const Nav = ({setLibraryStatus,libraryStatus}) => {
    return (
        <nav>
            <h1>Waves</h1>
            {/*onClick setLibraryStatus opposite status*/ }
            <button onClick={() => setLibraryStatus(!libraryStatus)}>
                Library
                <FontAwesomeIcon icon={faMusic}/>
            </button>
        </nav>
    )
}

export default Nav;