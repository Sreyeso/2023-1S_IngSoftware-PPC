import React from 'react'

export default function profiles(){
    return(
        <div id="profile">
            {Item()}
        </div>
    )
}

function Item(){
    return (
        <div className="flex">
            <div className="item">
                <img src="./sprites/pro.gif" alt="test"></img>
                <div className="info">
                    <h3 className="name text-dark">Name</h3>
                    <span>Región: </span>
                </div>
            </div>
            <div className="item">
                <span>Score</span>
            </div>
        </div>
    )
}