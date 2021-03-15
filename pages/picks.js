import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useEffect, useState} from 'react';
import DragNDrop from '../components/DraggableCarousel'
import Navbar from '../components/navbar'
import Link from 'next/link';

import StartScreen from "../components/StartScreen";
import Match from "../components/Match";
import EndScreen from "../components/EndScreen";
import { GameStateContext } from "../data/Context";


export default function Home() {
  const [gameState, setGameState] = useState("menu");
  const [userName, setUserName] = useState("");
  const [prediction, setPrediction] = useState('');
    setGameState("gimmick1");

  return (
    <div className="App">
      <h1>Future PPVs</h1>
      
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
        {gameState === "gimmick1" && <DraggableCarousel />}
        {gameState === "finished" && <EndScreen />}
      </GameStateContext.Provider>
      <Link href="/about">
        <a>Ver mas</a>
      </Link>
    </div>
  );
}
