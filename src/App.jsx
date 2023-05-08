import React, { useState, useEffect } from "react";
//import { socket } from "./socket";
import "./App.scss";
import ETH from './assets/ETH.png';
import APT from './assets/APT.png';
// import mehoy from './assets/mehoy.png'
import pp_dicegang from './assets/dicegang.png'
import pp_zerotolerance from './assets/zerotolerance.png'
import pp_nyahello from './assets/nyahello.png'
import pp_idek from './assets/idek.png'
import pp_see from './assets/see.png'
import pp_hexagon from './assets/hexagon.png'
import pp_fibonhack from './assets/fibonhack.png'
import pp_towerofhanoi from './assets/towerofhanoi.png'


// this will come from the server eventually.
let scoreboard = {
  team1: {
    name: "DiceGang",
    slug: "team1",
    ETH: {
      attack: 1,
      defense: 2,
    },
    APT: {
      attack: 3,
      defense: 4,
    },
  },
  team2: {
    name: "Zer0Tolerance",
    slug: "team2",
    ETH: {
      attack: 544,
      defense: 6,
    },
    APT: {
      attack: 7,
      defense: 8,
    },
  },
  team3: {
    name: "nyahello",
    slug: "team3",
    ETH: {
      attack: 51,
      defense: 61,
    },
    APT: {
      attack: 72,
      defense: 38,
    },
  },
  team4: {
    name: "idek",
    slug: "team4",
    ETH: {
      attack: 1,
      defense: 2,
    },
    APT: {
      attack: 3,
      defense: 4,
    },
  },
  team5: {
    name: "Social Engineering Experts",
    slug: "team5",
    ETH: {
      attack: 544,
      defense: 6,
    },
    APT: {
      attack: 7,
      defense: 8,
    },
  },
  team6: {
    name: "Hexagon",
    slug: "team6",
    ETH: {
      attack: 51,
      defense: 61,
    },
    APT: {
      attack: 72,
      defense: 38,
    },
  },
  team10: {
    name: "fibonhack",
    slug: "team7",
    ETH: {
      attack: 1,
      defense: 2,
    },
    APT: {
      attack: 3,
      defense: 4,
    },
  },
  team8: {
    name: "Tower of Hanoi",
    slug: "team8",
    ETH: {
      attack: 544,
      defense: 6,
    },
    APT: {
      attack: 7,
      defense: 8,
    },
  },
};

const images = {
  team1: pp_dicegang,
  team2: pp_zerotolerance,
  team3: pp_nyahello,
  team4: pp_idek,
  team5: pp_see,
  team6: pp_hexagon,
  team7: pp_fibonhack,
  team8: pp_towerofhanoi,
};



export default function App() {
  //const [isConnected, setIsConnected] = useState(socket.connected);
  //const [scoreboard, setScoreboard] = useState([]);
  const [chain, setChain] = useState("ETH");
  /*
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onScoreboard(value) {
      console.log("foo", value);
      setScoreboard(value);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("scoreboard", onScoreboard);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("foo", onScoreboard);
    };
  }, []);
  */



  return (
    <div className="App">
      <div className="topBar">

        <div className="chainButtonsContainer">
          <button onClick={() => setChain("ETH")} className={chain === 'ETH' ? 'active' : ''}>ETH</button>
          <button onClick={() => setChain("APT")} className={chain === 'APT' ? 'active' : ''}>APT</button>
        </div>

        <div className="imageContainer">
          <img src={ETH} className={chain === 'ETH' ? 'active' : ''} />
          <img src={APT} className={chain === 'APT' ? 'active' : ''} />
        </div>

        <div className="textContainer">

          <div className="title">HackTM A&D Scoreboard</div>
          <div className='description'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur molestias sapiente assumenda voluptatum delectus, eligendi iste aut necessitatibus dolorum, placeat tempora quae voluptas nam ipsa pariatur veritatis. Accusamus suscipit adipisci voluptatibus qui. Error ratione quidem aliquid voluptatibus, laborum beatae odio quasi? Facilis deserunt quod minus ullam nostrum blanditiis nulla quos.
          </div>
        </div>
      </div>


      <div className="table">


        <div className="tableRow header">
          <div className="tableCell">Rank</div>
          <div className="tableCell name">Team</div>
          <div className="tableCell">Attack</div>
          <div className="tableCell">Defense</div>
          <div className="tableCell">Total</div>
        </div>


        <div className="tableBody">
          {Object.values(scoreboard)
            .map((team) => {
              return {
                ...team,
                score: team[chain].attack + team[chain].defense,
              };
            })
            .sort((a, b) => b.score - a.score)
            .map((value, index) => {
              return (
                <div className="tableRow">
                  <div className="tableCell">{index + 1}</div>
                  <div className="tableCell name">
                    <img src={images[value.slug]} />
                    {value.name}
                  </div>
                  <div className="tableCell">{value[chain].attack}</div>
                  <div className="tableCell">{value[chain].defense}</div>
                  <div className="tableCell">{value.score}</div>
                </div>
              );
            })}
        </div>


      </div>

      <footer>
        fashioned by <b><a href="http://www.mihaic.me" target="_blank">www.mihaic.me</a></b>
      </footer>
    </div>
  );
}
