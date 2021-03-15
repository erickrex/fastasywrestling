import { useMachine } from '@xstate/react';
import { Machine } from 'xstate';

export const stepMachine = Machine({
  id: 'step',
  initial: 'one',
  states: {
    one: {
      meta: {
        matchName: "United States Championship",
        contenders:   [
                      {name: "Bobby Lashley", status: "champion"}, 
                      {name: "Riddle", status: "challenger"},
                      {name: "Keith Lee", status: "challenger"}
                  ]
      },
      on: { NEXT: 'two', JUMP: 'five' }
    },
    two: {
      meta: {
        matchName: "24/7 Championship",
        contenders:   [
                      {name: "Asuka", status: "champion"}, 
                      {name: "Randy_Orton", status: "challenger"},
                      
                  ]
      },
      on: { NEXT: 'three', PREV: 'one', JUMP: 'five' }
    },
    three: {
      meta: {
        matchName: "Womens Championship",
        contenders:   [
                      {name: "Bianca Belair", status: "champion"}, 
                      {name: "Cesaro", status: "challenger"},
                      {name: "Maryse", status: "challenger"}
                  ]
      },
      on: { NEXT: 'four', PREV: 'two', JUMP: 'five' }
    },
    four: {
      meta: {
        matchName: "North American Championship",
      contenders:   [
                    {name: "Johnny Gargano", status: "champion"}, 
                    {name: "Kushida", status: "challenger"}
                    ]
      },
      on: { NEXT: 'five', PREV: 'three' }
    },
    five: {
      meta: {
        matchName: "United States Championship",
        contenders:   [
                      {name: "Andrade", status: "champion"}, 
                      {name: "Alexa_Bliss", status: "challenger"},
                      {name: "Bailey", status: "challenger"}
                  ]
      },
      type: 'final'
    }
  }
});

console.log(stepMachine.transition('one', 'NEXT').value);

export const Card = [
  {
    matchName: "United States Championship",
    contenders:   [
                  {name: "Bobby Lashley", status: "champion"}, 
                  {name: "Riddle", status: "challenger"},
                  {name: "Keith Lee", status: "challenger"}
              ]
  },
  {
      matchName: "24/7 Championship",
      contenders:   [
                    {name: "Asuka", status: "champion"}, 
                    {name: "Orton", status: "challenger"},
                    {name: "Keith Lee", status: "challenger"}
                ]
    },
    {
      matchName: "Womens Championship",
      contenders:   [
                    {name: "Bobby Lashley", status: "champion"}, 
                    {name: "Riddle", status: "challenger"},
                    {name: "Keith Lee", status: "challenger"}
                ]
    },
    {
      matchName: "North American Championship",
    contenders:   [
                  {name: "Johnny Gargano", status: "champion"}, 
                  {name: "Kushida", status: "challenger"}
                  ]
    },
    {
      matchName: "United States Championship",
      contenders:   [
                    {name: "Bobby Lashley", status: "champion"}, 
                    {name: "Riddle", status: "challenger"},
                    {name: "Keith Lee", status: "challenger"}
                ]
    }
];