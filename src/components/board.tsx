import React from 'react'
import Profiles from './profiles';
import enviar from '../pages/leaderboard';

export default function Board(){
    return(
        <div className="board">
            <h1 className="leaderboard">Rankings</h1>
            <Profiles datos={'a'}></Profiles>
        </div>
    );
}

