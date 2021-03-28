import { stepMachine } from "../data/Wwe_2021_03_21";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useMachine } from "@xstate/react";
import { Machine, interpret } from "xstate";
import { useContext } from "react";
import { GameStateContext } from "../data/Context";
import { stateValuesEqual } from "xstate/lib/State";

function Match() {
  const [currentMatch, setCurrentMatch] = useState(0);
  const [optionChosen, setOptionChosen] = useState([]);
  const { prediction, setPrediction, gameState, setGameState } = useContext(
    GameStateContext
  );

  const [state, sendState] = useMachine(stepMachine);

  const cardi = stepMachine.states;

  //runs every time the user variable is changed
  useEffect(() => {
    //console.log(optionChosen);
    //console.log(state.nextEvents);
  }, [optionChosen]);

  useEffect(() => {
    if (prediction[currentMatch]) {
      setOptionChosen(prediction[currentMatch]);
    }
    //console.log(optionChosen);
  }, [prediction]);

  const chooseOption = (option) => {
    setOptionChosen(option);
  };

  const nextMatch = () => {
    console.log("Prediction index")
    console.log(prediction[currentMatch])
    console.log(currentMatch)
    console.log(prediction[state.value])
    
    let array2 = prediction.map((a) => {
      return { ...a };
    });

    array2.map((val) => {
      if (Object.keys(val)[0] === state.value) {
        val[state.value] = optionChosen;
        setPrediction(...prediction,...array2)
        console.log("IF YEs" + prediction)
        return;
      }
      else {
        let insertPrediction = { [state.value] : optionChosen}          
        setPrediction([...prediction, insertPrediction])
        console.log("ELSE " + prediction)
        return;
      }
    });

    // prediction.map(fight => {
    //   if (Object.keys(fight) === state.value){
    //     Object.values(fight) = optionChosen
    //     setPrediction()
    //     break;
    //   }
    //   else {
    //     let insertPrediction = { [state.value] : optionChosen}          
    //     setPrediction([...prediction, insertPrediction])
    //     break;
    //   }
    // }) 
    // if (!prediction[state.value]){
      
    //     let insertPrediction = { [state.value] : optionChosen}          
    //     setPrediction([...prediction, insertPrediction])

    //   }
    //   else {
    //     prediction.map((pred) => {
    //       console.log("KEYS OF PRED" + Object.keys(pred))
    //     })
        //let insertPrediction = { [state.value] : optionChosen}          
        //setPrediction([...prediction, insertPrediction])       
      
    
    //
    setOptionChosen([]);
    
    setCurrentMatch(currentMatch + 1);
    
    sendState("NEXT");
  };

  const prevMatch = () => {
    setPrediction((currentPrediction) =>
      currentPrediction.map((item, itemI) =>
        itemI === currentMatch ? optionChosen : item
      )
    );
    
    setOptionChosen([]);
    setCurrentMatch(currentMatch - 1);

    sendState("PREV");
  };

  const finishPrediction = () => {
    setPrediction((prediction) => [...prediction, optionChosen]);

    setGameState("gimmick1");
  };

  const example = "one";

  return (
    <div className="match">
      <h1>{cardi[state.value].meta.matchName}</h1>

      <div className="match">
        {cardi[state.value].meta.contenders.map((contender, contenderI) => (
          <div
            className={
              optionChosen == contender.name ? "wrestler current" : "wrestler"
            }
            key={contender.name}
            onClick={() => {
              chooseOption(contender.name);
            }}
          >
            {contender.name}
            <Image
              src={`/images/${contender.name}.png`}
              alt=""
              width="100"
              height="100"
            />
          </div>
        ))}
      </div>
      <h2>Match {state.value}</h2>
      <button onClick={prevMatch} className="prevMatch">
        Previous Match
      </button>

      {currentMatch == cardi.length - 1 ? (
        <button onClick={finishPrediction} className="nextMatch">
          Finish Prediction
        </button>
      ) : (
        <button onClick={nextMatch} className="nextMatch">
          Next Match
        </button>
      )}
    </div>
  );
}

export default Match;
