import React, { ReactNode } from "react";
import { useState, useEffect } from "react";

function GameFinish(props) {
  const [gameEnd, setGameEnd]=useState<string>();

    useEffect(()=>{
        setGameEnd(props.gameEnd)
    }, [props.gameEnd])

  return (
    <>
    {gameEnd=='win' && <div style={{zIndex:999,display:'flex', alignItems:'center', justifyContent:'center',position:'absolute',
        width:'100%',height:'100vh',fontSize:'70px',fontWeight:600,backgroundColor:"antiquewhite", top:0,left:0}}>
        YOU WON
    </div>}
    {gameEnd=='lose' && <div style={{zIndex:999,display:'flex', alignItems:'center', justifyContent:'center',position:'absolute',
        width:'100%',height:'100vh',fontSize:'70px',fontWeight:600,backgroundColor:"antiquewhite", top:0,left:0}}>
        HOLD THIS L
    </div>}
    {gameEnd=='draw' && <div style={{zIndex:999,display:'flex', alignItems:'center', justifyContent:'center',position:'absolute',
        width:'100%',height:'100vh',fontSize:'70px',fontWeight:600,backgroundColor:"antiquewhite", top:0,left:0}}>
        GAME DRAW
    </div>}
    </>
  );
}

export default GameFinish;
