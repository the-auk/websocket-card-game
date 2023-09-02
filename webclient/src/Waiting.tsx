import React from "react";
import styles from "./Waiting.module.css";
import { useState, useEffect } from "react";

function Waiting({waiting, handleStartGame}) {
  const [deviceCode, setDeviceCode] = useState("");
  
  useEffect(() => {
    const savedCode = JSON.parse(localStorage.getItem("deviceCodeHash"));
    if (savedCode == null) {
      const pool =
        "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890";
      let buf = "";
      for (let i = 0; i < 16; i++) {
        buf += pool.charAt(Math.floor(Math.random() * pool.length));
      }
      setDeviceCode(buf);
      localStorage.setItem("deviceCodeHash", JSON.stringify(buf));
    }
    else{
        setDeviceCode(savedCode)
    }
  }, []);


  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>Card Game</div>
      <div onClick={()=>{if(!waiting){handleStartGame(deviceCode)}}} className={styles.button}>{waiting?"Waiting":"Start Game"}</div>
    </div>
  );
}

export default Waiting;
