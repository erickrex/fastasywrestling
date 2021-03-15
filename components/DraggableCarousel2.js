import React, {Component, useState, useRef, useEffect} from 'react'
import Image from 'next/image'
import next from 'next'
import { useContext } from "react";

import { GameStateContext } from "../data/Context";
import { eliminationMen1, eliminationMen2 } from "../data/ChamberContenders";
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';



const onDragEnd = (result, contenders, setContenders) => {
  if (!result.destination) return;
  const { source, destination } = result;
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = contenders[source.droppableId];
    const destColumn = contenders[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setContenders({
      ...contenders,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = contenders[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setContenders({
      ...contenders,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};



function DraggableCarousel2() {
  const { prediction, setPrediction, gameState, setGameState } = useContext(
    GameStateContext
  );
  console.log(prediction)
  let match;
    if(gameState=='gimmick1'){
         match = eliminationMen1;
    }
    if(gameState=='gimmick2'){
        match = eliminationMen2;
    }
  
  
  const eliminationChamberParticipants = {
    ["Winner"]: {
      title: "Winner (top), eliminated superstars, first eliminated should be at the bottom",
      items: []
    },
    ["Selection"]: {
      title: "Contenders",
      items: match.contenders
    }
    };
  
  const [contenders, setContenders] = useState(eliminationChamberParticipants);
 


  const nextChamberMatch = () => {
    setPrediction(prediction => [...prediction, contenders["Winner"].items]);
    console.log("prueba")

    console.log(contenders["Winner"].items[0].name);
    console.log(prediction)
    setGameState("gimmick2");
  };

  const lastMatch = () => {
    setPrediction(prediction => [...prediction, contenders["Winner"].items]);
    setGameState("dependent");
  };
  console.log("prediction")


  return (
    <div style={{ justifyContent: "center", height: "100%" }}>
      <DragDropContext
        onDragEnd={result => onDragEnd(result, contenders, setContenders)}
      >
        {Object.entries(contenders).map(([columnId, column], index) => {
          return (
            <div
              style={{
                
                alignItems: "center"
              }}
              key={columnId}
            >
              <h2>{column.title}</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId} direction={columnId=="Winner"?"vertical":"horizontal"}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={columnId=="Winner"?{
                          background: snapshot.isDraggingOver
                            ? "#757083"
                            : "#7A7978",
                          padding: 4,
                          borderRadius: "16px",
                          width: 250,
                          minHeight: 500,
                          display: "flex", flexDirection: "column"
                        }:{
                          background: snapshot.isDraggingOver
                            ? "#757083"
                            : "#7A7978",
                          padding: 4,
                          borderRadius: "16px",
                          width: "90vw",
                          minHeight: 200,
                          display: "flex", flexDirection: "row", overflow: "auto"
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                              
                              
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      margin: "0.5rem",
                                      minHeight: "5rem",
                                      maxHeight: "12rem",
                                      backgroundColor: snapshot.isDragging
                                        ? "#263B4A"
                                        : "#151515",
                                      color: "white",
                                      borderRadius: "16px",
                                      display: "flex",
                                      flexDirection: "column",
                                      boxShadow: "-1rem 0 3rem #000",
                                  
                                    
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    <Image
                                    src={`/images/${item.name}.png`}
                                    alt=""
                                    width="100"
                                    height="200"
                                    />

                                    {item.name}
                                    
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
      {gameState == "gimmick1" ? (
        <button onClick={nextChamberMatch} className="nextMatch">
        Next Match
      </button>
      ) : (
        <button onClick={lastMatch} className="nextMatch">
          Next Match
        </button>
       )}

      
    </div>
  );
}


export default DraggableCarousel2;