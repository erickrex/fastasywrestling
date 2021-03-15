import { useMachine } from '@xstate/react';
import { Machine } from 'xstate';

export const stepMachine = Machine({
  id: 'step',
  initial: 'one',
  states: {
    one: {
      meta: {
        matchName: "Universal Championship",
        contenders:   [
                      {name: "Roman Reigns", status: "champion"}, 
                      {name: "Daniel Bryan", status: "challenger"},
                      
                  ]
      },
      on: { NEXT: 'two' }
    },
    two: {
      meta: {
        matchName: "Women's Tag Team Championship",
        contenders:   [
                      {name: "Nia Jax $ & Shayna Baszler", status: "champion"}, 
                      {name: "Bianca Belair & Sasha Banks", status: "challenger"},
                      
                  ]
      },
      on: { NEXT: 'three', PREV: 'one' }
    },
    three: {
      meta: {
        matchName: "Intercontinental Championship",
        contenders:   [
                      {name: "Big E", status: "champion"}, 
                      {name: "Apollo Crews", status: "challenger"},
                      
                  ]
      },
      on: { NEXT: 'four', PREV: 'two' }
    },
    four: {
      meta: {
        matchName: "Last Man Standing Match",
      contenders:   [
                    {name: "Drew McIntyre", status: "challenger"}, 
                    {name: "Sheamus", status: "challenger"}
                    ]
      },
      on: { NEXT: 'five', PREV: 'three' }
    },
    five: {
      meta: {
        matchName: "United States Championship",
        contenders:   [
                      {name: "Riddle", status: "champion"}, 
                      {name: "Mustafa Ali", status: "challenger"},
                      
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