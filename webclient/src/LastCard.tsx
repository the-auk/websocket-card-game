import React, { ReactNode } from "react";
import styles from "./LastCard.module.css";
import { useState, useEffect } from "react";

function LastCard(props) {
  const [discardPile, setDiscardPile] = useState<string[]>([]);
  const [renderList, setRenderList] = useState<ReactNode[]>();
  const [lastCard, setLastCard] = useState<string>("");
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [gameFinishStat, setGameFinishStat] = useState<string>();

  useEffect(() => {
    if (props.newCard != "") {
      let winCondition:boolean=false
      if (lastCard.substring(0,lastCard.length-1) == props.newCard.substring(0,props.newCard.length-1)) {
        winCondition=true
      }
      setLastCard(props.newCard);
      setDiscardPile((prev) => {
        return [...prev, props.newCard];
      });
      let random: number = Math.random() * -60 + 30;
      let temp: ReactNode = (
        <div
          key={props.newCard}
          style={{ transform: `rotate(${random}deg)`, zIndex: discardPile.length }}
          className={styles.card}
        >
          <div className={styles.cardNumber}>{props.newCard}</div>
        </div>
      );
      setRenderList((prev)=>{return [prev, temp]})
      setTimeout(()=>{
        if(winCondition==true){
          setGameWon(true)
        }
      }, 1000)
    }
  }, [props.newCard]);

  useEffect(()=>{
    if(gameWon && props.deviceId!=JSON.parse(localStorage.getItem("deviceCodeHash"))){
      setGameFinishStat('win') }
    else if(gameWon && props.deviceId==JSON.parse(localStorage.getItem("deviceCodeHash"))){
      setGameFinishStat('lose')
    }
  }, [gameWon])
  
  useEffect(()=>{
    if(discardPile.length==52){
      setGameFinishStat('draw')
    }
  }, [discardPile])

  useEffect(()=>{
    if(gameFinishStat!=''){
    props.handleGameEnd(gameFinishStat)}
  }, [gameFinishStat])

  return (
    <div style={{ width: "300px", position: "relative" }}>
      {discardPile.length == 0 ? <></> : renderList}
    </div>
  );
}

export default LastCard;
