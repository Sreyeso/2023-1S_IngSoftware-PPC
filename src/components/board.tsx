import React from 'react'
import Profiles from './profiles';

export default function Board(){
    return(
        <div className="board">
            <h1 className="leaderboard">Rankings</h1>
            <Profiles></Profiles>
        </div>
    );
}