import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useEffect, useState} from 'react';

import DraggableCarousel2 from '../components/DraggableCarousel2'
import Navbar from '../components/navbar'
import Link from 'next/link';

import StartScreen from "../components/StartScreen";
import Match from "../components/Match";
import EndScreen from "../components/EndScreen";
import DependentMatch from "../components/DependentMatch";

import { GameStateContext } from "../data/Context";


export default function Home() {
  const [gameState, setGameState] = useState("menu");
  const [userName, setUserName] = useState("");
  const [prediction, setPrediction] = useState([]);
  

  return (
    <div className="App">
      <h1>Proximos eventos</h1>
      
      <GameStateContext.Provider
        value={{
          gameState,
          setGameState,
          userName,
          setUserName,
          prediction,
          setPrediction,
        }}
      >
        {gameState === "menu" && <StartScreen />}
        {gameState === "playing" && <Match />}
        {gameState === "finished" && <EndScreen />}
        {gameState === "gimmick1" && <DraggableCarousel2 />}
        
        {gameState === "gimmick2" && <DraggableCarousel2 />}
        {gameState === "lastMatch" && <EndScreen/>}
        {gameState === "dependent" && <DependentMatch/>}
        

      </GameStateContext.Provider>
      
    </div>
  );
}
