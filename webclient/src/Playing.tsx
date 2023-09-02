import React from 'react';
import styles from "./Playing.module.css";
import {useState, useEffect} from "react";
import LastCard from './LastCard';
import CardDeck from './CardDeck';

function Playing({handleGameEnd, deviceId, newCard, handleDrawCard}) {
    const[canDraw, setCanDraw] = useState<boolean>(false);

    useEffect(()=>{
        if(deviceId==JSON.parse(localStorage.getItem("deviceCodeHash"))){
            setTimeout(()=>{
                setCanDraw(true)
            }, 1000)
        }
    }, [deviceId])

    const handleDraw =()=>{
        if(canDraw){
        handleDrawCard()
        setCanDraw(false);}
    }

    const handleGameEnding = (end)=>{
        setCanDraw(false)
        console.log(end)
        handleGameEnd(end)
    }

    return (    
        <div className={styles.wrapper}>
        <div className={styles.cards}>
            <div className={styles.lastCard}>
                <LastCard handleGameEnd={handleGameEnding} deviceId={deviceId} newCard={newCard} />
            </div>
            <div className={styles.cardDeck}>
                <CardDeck />
            </div>
        </div>
        <div onClick={handleDraw} className={styles.button}>
            {canDraw?"Draw Card":"Please Wait"}
        </div>
    </div>
  );
}

export default Playing;
