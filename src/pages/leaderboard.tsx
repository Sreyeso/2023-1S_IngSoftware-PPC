import Board from "@/components/board";
import React, { Component } from "react";
import * as ReactDOM from "react-dom";
import dynamic from 'next/dynamic';

//tuto tomado de: https://www.youtube.com/watch?v=p_046Qe19p0

export default class Leaderboard extends Component{
    render() {
    return(
    <div>
    <Board></Board>
    <button><img src="./sprites/start_game.png" alt="Iniciar Juego"/></button>
    <button><img src="./sprites/profile.png" alt="Perfil"/></button>
    <button><img src="./sprites/rankings.png" alt="Rankings"/></button>
    <button><img src="./sprites/gacha.png" alt="Gacha"/></button>
    </div>);
    }
}