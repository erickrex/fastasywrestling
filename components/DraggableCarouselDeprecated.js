import React, {useState, useRef, useEffect} from 'react'
import Image from 'next/image'
import next from 'next'
import { useContext } from "react";

import { GameStateContext } from "../data/Context";
import { eliminationMen1, eliminationMen2 } from "../data/ChamberContenders";



//order of wrestlers pod opening

function DraggableCarouselDeprecated() {
    
    
    // const gimmick = () => {
        
    //     setGameState("gimmick1");
    //   };
    const { prediction, setPrediction, gameState, setGameState } = useContext(
        GameStateContext
      );
    let match;
    if(gameState=='gimmick1'){
         match = eliminationMen1;
    }
    if(gameState=='gimmick2'){
        match = eliminationMen2;
    }
    const [list, setList] = useState(match); 

    const [dragging, setDragging] = useState(false);
    
    console.log(gameState);
      
    //   if (gameState == "gimmick1") 
    //     {let match = eliminationMen1} 
    //   if (gameState == "gimmick2") 
    //     {let match = eliminationMen2;}
    //     console.log(GameStateContext)

    //for rerendering order
    useEffect(() => {
        console.log(list);
        setList(match)
         
    }, [setList, match])

    // useEffect(() => {
    //     setList(eliminationMen2);
    // }, [setList, eliminationMen2])

    // const gimmickMatch = () => {
    //     setPrediction(prediction => [...prediction, optionChosen]);
        
    //     setGameState("gimmick1");
    //   };

    const dragContender = useRef();
    const dragContenderNode = useRef();
    
    const handletDragStart = (e, contender) => {

        dragContenderNode.current = e.target;
        dragContenderNode.current.addEventListener('dragend', handleDragEnd)
        dragContender.current = contender;

        setTimeout(() => {
            setDragging(true); 
        },0)       
    }
    
    const handleDragEnter = (e, targetContender) => {
        if (dragContenderNode.current !== e.target) {
            setList(oldList => {
                let newList = JSON.parse(JSON.stringify(oldList))
                newList[targetContender.grpI].contenders.splice(targetContender.contenderI, 0, newList[dragContender.current.grpI].contenders.splice(dragContender.current.contenderI,1)[0])
                dragContender.current = targetContender;
               
                return newList
            })
        }
    }      
    
    // const hoveredRect = ref.current.getBoundingClientRect();
    // const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
    // const mousePosition = monitor.getClientOffset();
    // const hoverClientY = mousePosition.y - hoveredRect.top;


    // setItems(prevState => {
    //     const newItems = prevState.filter((i, idx) => !== dragIndex);
    //     newItems.splice(hoverIndex,0,item);
    //     return [...newItems];
    // })

    const handleDragEnd = (e) => {
        setDragging(false);
        dragContender.current = null;
        dragContenderNode.current.removeEventListener('dragend', handleDragEnd)
        dragContenderNode.current = null;
    }
    const getStyles = (contender) => {
        if (dragContender.current.grpI === contender.grpI && dragContender.current.contenderI === contender.contenderI) {
            return "wrestler current"
        } 
        return "wrestler"
    }

    const nextMatch = () => {
        setGameState("gimmick2");

    };
    
    if (list) {
        return (                
            <div>
            {list.map((grp, grpI) => ( 
              
              <div key={grp.title} onDragEnter={dragging && !grp.contenders.length?(e) => handleDragEnter(e,{grpI, contenderI: 0}):null} className={grpI==0?"vertical-wrestlers":"horizontal-wrestlers"}>
                {grp.contenders.map((contender, contenderI) => (
                  
                  <div draggable key={contender}  onDragStart={(e) => handletDragStart(e, {grpI, contenderI})} onDragEnter={dragging?(e) => {handleDragEnter(e, {grpI, contenderI})}:null} className={dragging?getStyles({grpI, contenderI}):"wrestler"}>
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
            ))}
        {/* {currentMatch == Card.length - 1 ? (
        <button onClick={finishQuiz} className="nextMatch">
          Finish Quiz
        </button>
      ) : ( */}
        <button onClick={nextMatch} className="nextMatch">
          Next Match
        </button>
       {/* )} */}
        </div>)
    } else { return null}

}

export default DraggableCarouselDeprecated;