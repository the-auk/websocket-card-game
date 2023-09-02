import { PubSub } from 'graphql-subscriptions';
const pubsub = new PubSub();

const cards:string[] = [
  '1S', '1C', '1D', '1H',
  '2S', '2C', '2D', '2H',
  '3S', '3C', '3D', '3H',
  '4S', '4C', '4D', '4H',
  '5S', '5C', '5D', '5H',
  '6S', '6C', '6D', '6H',
  '7S', '7C', '7D', '7H',
  '8S', '8C', '8D', '8H',
  '9S', '9C', '9D', '9H',
  '10S', '10C', '10D', '10H',
  '11S', '11C', '11D', '11H',
  '12S', '12C', '12D', '12H',
  '13S', '13C', '13D', '13H',
];
const usedCards:number[]=[];
const deviceId:string[]=[];
let randomCardGlobal:string='';
let gameActive:boolean=false;

const drawCard =(deviceHashId)=>{
  //publish carddrawn update here
  while(true){
  let randomIndex:number=Math.floor(Math.random()*cards.length);
  if(!usedCards.includes(randomIndex)){
    let randomCard:string = cards[randomIndex]
    usedCards.push(randomIndex)
    deviceHashId = JSON.parse(deviceHashId.deviceHashId)
    if(deviceHashId==deviceId[0]){
      pubsub.publish('CARD_DRAWN_UPDATE', {"cardDrawn": {"currentCard":randomCard, "currentPlayer":deviceId[1]}})
      return {"deviceId":'testing', "newCard":'testing'}
    }
    else if (deviceHashId==deviceId[1]){
      pubsub.publish('CARD_DRAWN_UPDATE', {"cardDrawn": {"currentCard":randomCard, "currentPlayer":deviceId[0]}})
      return {"deviceId":'testing', "newCard":'testing'}
    }
  }
}
}

const startGame =(randomId)=>{
  if(deviceId.includes(randomId.randomId)){
    if (deviceId.length === 2) {
      pubsub.publish('GAME_STATUS_UPDATE', {"gameStatus": {"gameStatus":true, "currentPlayer":deviceId[0]}})
      return true;
    }
  }
  deviceId.push(randomId.randomId);
  if (deviceId.length === 2) {
    console.log(deviceId)
    pubsub.publish('GAME_STATUS_UPDATE', {"gameStatus": {"gameStatus":true, "currentPlayer":deviceId[0]}})
    return true;
  }
  return gameActive;
}

export const typeDefs = `#graphql
  type ExampleObject {
    foo: String
    bar: Boolean
  }
  type Query {
    exampleObjects: [ExampleObject]
  }

  type Mutation {
    startGame(randomId: String!): Boolean
    drawCard(deviceHashId: String!): DrawCardResult
  }
  type DrawCardResult{
    deviceId:String
    newCard:String
  }
  type gameStartObject{
    gameStatus:Boolean
    currentPlayer:String
  }
  type cardDrawnObject{
    currentCard:String
    currentPlayer:String
  }
  type Subscription{
    gameStatus:gameStartObject
    cardDrawn:cardDrawnObject
  }
`;


export const resolvers = {
  Mutation:{
    startGame:((_,randomId)=>{
      return startGame(randomId)
    }),
    drawCard:((_,deviceHashId)=>{
      return drawCard(deviceHashId)
    })
  },
  Query: {
    exampleObjects: () => {
      return [
        { foo: "Lorem ipsum", bar: true },
        { foo: "Ipsum lorem", bar: false },
      ];
    },
  },
  Subscription: {
    gameStatus: {
      subscribe: () => pubsub.asyncIterator(['GAME_STATUS_UPDATE']),
    },
    cardDrawn: {
      subscribe: () => pubsub.asyncIterator(['CARD_DRAWN_UPDATE']),
    },
  },
};