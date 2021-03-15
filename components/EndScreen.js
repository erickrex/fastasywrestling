import React from "react";
import { useContext } from "react";
import { GameStateContext } from "../data/Context";
import { Card } from "../data/Wwe_2021_02_21";
import { eliminationMen1, eliminationMen2 } from "../data/ChamberContenders";

const EndScreen = () => {
  const { prediction, setPrediction, setGameState, userName } = useContext(
    GameStateContext
  );
  console.log(prediction)
  const finishPrediction = () => {
    
    setGameState("menu");
  };

  const previousQuestion = () => {
    console.log("backme")
  }

  //using an array to render strings with predictions, the prediction json object is handled using context
  let userPrediction = []
  Card.map((match, matchIndex) => {
    match.contenders.map((contender, contenderIndex) =>{
      if (prediction[matchIndex] == contender.name) 
      { if  (contender.status == 'champion') 
        {
          if (prediction[matchIndex].includes("&"))
          {userPrediction.push(`${prediction[matchIndex]} retain ${match.matchName}`)} 
          else
          userPrediction.push(`${prediction[matchIndex]} retains ${match.matchName}`)
        
        } else if (contender.status == 'challenger') 
        {
        if (prediction[matchIndex].includes("&"))
        {userPrediction.push(`${prediction[matchIndex]} win ${match.matchName}`)}
        else
        userPrediction.push(`${prediction[matchIndex]} wins ${match.matchName}`)
        } else userPrediction.push(`${prediction[matchIndex]} winss ${match.matchName}`)
      }
    })
  })
  console.log(prediction[prediction.length-2][0].name + " becomes the No 1 contender for the Universal Championship")

  userPrediction.push(`${prediction[prediction.length-2][0].name} becomes the No 1 contender for the Universal Championship`)

   if (prediction[prediction.length-3][0].name == eliminationMen1.contenders[0].name) {
    userPrediction.push(`${prediction[prediction.length-3][0].name} retains the WWE championship`)
     console.log(prediction[prediction.length-3][0].name + " retains the WWE championship")
   }
   if (prediction[prediction.length-3][0].name !== eliminationMen1.contenders[0].name) {
    userPrediction.push(`${prediction[prediction.length-3][0].name} wins the WWE championship`)
    console.log(prediction[prediction.length-3][0].name + " wins the WWE championship")
   }
  

    
    if (prediction[prediction.length-1] == "Roman Reigns") {
      userPrediction.push(`Roman Reigns retains the Universal championship`)
     console.log("Roman Reigns " + "retains the Universal championship")
    } else {
      userPrediction.push(`${prediction[prediction.length-1]} wins the Universal championship`)
      console.log(prediction[prediction.length-1] + " wins the Universal championship")
    }
  
  return (
    <div className="EndScreen">
      <h1>Your predictions</h1>
      <h3>{userName}</h3>
      <h1>
        {userPrediction.map(element => <div key={element}>{element}</div>)} 
      </h1>
      <button onClick={previousQuestion}>Back</button>
      <button onClick={finishPrediction}>Submit</button>
    </div>
  );
};

export default EndScreen;