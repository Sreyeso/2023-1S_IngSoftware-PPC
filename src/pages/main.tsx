import React, { Component } from "react";
import styles from '../styles/Main.module.css';
import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Sketch from 'react-p5';

type jsAnswer = {
    name: string;
}

const startButton = '/buttons/start.png';
const profileButton = '/buttons/PROFILE.png';
const rankingButton = '/buttons/RANKINGS.png';
const gachaButton = '/buttons/GACHA.png';

export default function Main (){
    return (
        <div>
            <Head>
                <title>Join PPC Games</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main>
                <div className = {styles.background}>
                    <div className= {styles.allInside}>
                        <div className = {styles.logoDiv}>
                            <img 
                                src="/pages_imgs/logo_PPC.png"
                                className={styles.logo}>
                            </img> 
                        </div>
                        <h1 className= {styles.title}>POLLO RUNNER</h1>
                        <Buttons/>
                    </div>    
                </div>
            </main>
        </div>
    );
}

function Buttons() {

    return (
        <div className= {styles.buttonDiv}> 
            <StartButton/>
            <ProfileButton/>
            <RankingButton/>
            <GachaButton/>
        </div>
    );
}

function StartButton(){
    //Cuando se presiona el botón, se redirecciona al juego

    function showMessageScreen (js: jsAnswer) {
        console.log(js);
    }   

    async function startGame(){
        showMessageScreen({name: "Iniciando Juego..."})
        window.location.href = '/game';
    }

    return (
        <button 
            type="button"
            onClick={startGame} 
            className={styles.button}
        >
            <img src = {startButton}></img>    
        </button>
    );
}

function ProfileButton(){
    //Cuando se presiona el botón, se redirecciona al perfil del jugador

    function showMessageScreen (js: jsAnswer) {
        console.log(js);
    }

    async function openProfile(){
        showMessageScreen({name: "Entrando al perfil del jugador..."})
        window.location.href = '/game';
    }
    
    return (
        <button 
            type="button"
            onClick={openProfile} 
            className={styles.button}
        >
            <img src = {profileButton}></img>    
        </button>
    );
}

function RankingButton(){
    //Cuando se presiona el botón, se redirecciona a la tabla de ranking

    function showMessageScreen (js: jsAnswer) {
        console.log(js);
    }

    async function openRanking(){
        showMessageScreen({name: "Entrando a el Ranking..."})
        window.location.href = '/game';
    }
    
    return (
        <button 
            type="button"
            onClick={openRanking} 
            className={styles.button}
        >
            <img src = {rankingButton}></img>    
        </button>
    );
}

function GachaButton(){
    //Cuando se presiona el botón, se redirecciona al gacha

    function showMessageScreen (js: jsAnswer) {
        console.log(js);
    }

    async function openGacha(){
        showMessageScreen({name: "Entrando al GACHA..."})
        window.location.href = '/gacha';
    }
    
    return (
        <button 
            type="button"
            onClick={openGacha} 
            className={styles.button}
        >
            <img src = {gachaButton}></img>    
        </button>
    );
}