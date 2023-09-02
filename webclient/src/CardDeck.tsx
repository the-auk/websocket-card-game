import React from 'react';
import styles from "./CardDeck.module.css";
import {useState, useEffect} from "react";

function CardDeck() {
  const[currentCard, setCurrentCard] = useState()

  return (
    <div className={styles.deck}>
        <div style={{backgroundImage:`url(frog.png)`}} className={styles.innerCard}>
        </div>
    </div>
  );
}

export default CardDeck;
