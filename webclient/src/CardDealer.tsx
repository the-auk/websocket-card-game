import React from "react";
import styles from "./CardDealer.module.css";
import { useMutation, gql, useSubscription } from "@apollo/client";
import { useState, useEffect } from "react";
import Waiting from "./Waiting";
import Playing from "./Playing";
import GameFinish from "./GameFinish";

const START_GAME = gql`
  mutation Startgame($randomId: String!) {
    startGame(randomId: $randomId)
  }
`;
const DRAW_CARD = gql`
  mutation DrawCard($deviceHashId: String!) {
    drawCard(deviceHashId: $deviceHashId){
      deviceId
      newCard
    }
  }
`;
const GAME_STATUS_SUBSCRIPTION = gql`
subscription{
  gameStatus{
    gameStatus
    currentPlayer
  }
}
`;
const CARD_DRAWN_SUBSCRIPTION = gql`
subscription{
  cardDrawn{
    currentCard
    currentPlayer
  }
}
`;

function CardDealer() {
  //local device id variable
  // const[deviceHashId, setDeviceHashId] = useState<string>();
  //track if game is active
  const [gameActive, setGameActive] = useState<boolean>(false);
  //variable to change screens
  const [waiting, setWaiting] = useState<boolean>(false);
  //track the card drawn
  const [newCard, setNewCard] = useState<string>('');
  //track player turn
  const [currentPlayer, setCurrentPlayer] = useState<string>('');
  //
  const[gameEnd, setGameEnd] = useState<string>('');

  const [startGame] = useMutation(START_GAME);
  const [drawCard] = useMutation(DRAW_CARD);
  const {data:gameStatus} = useSubscription(GAME_STATUS_SUBSCRIPTION);

  const {data:cardDrawn} = useSubscription(CARD_DRAWN_SUBSCRIPTION);
  const currentCard:string = cardDrawn?.cardDrawn.currentCard

  useEffect(()=>{
    if(cardDrawn){
    setCurrentPlayer(cardDrawn?.cardDrawn.currentPlayer)
    setNewCard(currentCard)
  }
  }, [cardDrawn])

  useEffect(()=>{
    if(currentPlayer==undefined){
      console.log("testing")
    }
    else{
      setGameActive(gameStatus?.gameStatus)
    }
  }, [currentPlayer])

  useEffect(()=>{
      setCurrentPlayer(gameStatus?.gameStatus.currentPlayer)
  }, [gameStatus])

  const handleStartGame = async (randomId: string) => {
    try {
      const {data} = await startGame({ variables: { randomId } });
      if(data.startGame==false){
        setWaiting(true)
      }
      else{
        setWaiting(false)
      }
    } catch (error) {console.log(error)}
  };

  const handleDrawCard = async()=>{
    try {
      const deviceHashId:string = localStorage.getItem("deviceCodeHash")
      const {data}=await drawCard({variables: { deviceHashId }});
    } catch (error) {throw error}
  };

  const handleGameEnd = (end) =>{
    console.log("gameEnded")
    setGameEnd(end)
  }

  return (
    <div>
      {gameActive ? <Playing handleGameEnd={handleGameEnd} deviceId={currentPlayer} newCard={newCard} handleDrawCard={handleDrawCard} /> : <Waiting waiting={waiting} handleStartGame={handleStartGame} />}
      {gameEnd!='' && <GameFinish gameEnd={gameEnd} />}
    </div>
  );
}

export default CardDealer;
