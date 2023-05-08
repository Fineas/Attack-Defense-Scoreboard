import React, { useState, useEffect } from "react";
//import { socket } from "./socket";
import "./App.scss";
import ETH from './assets/ETH.png';
import APT from './assets/APT.png';
import mehoy from './assets/mehoy.png'


// this will come from the server eventually.
let scoreboard = {
  team1: {
    name: "Team 1",
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
    name: "Team 2",
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
    name: "Team 3",
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
};

const images = {
  team1: mehoy,
  team2: mehoy,
  team3: mehoy,
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
      <div className="title">HackTM A&D Scoreboard</div>
      <div className="chainSwitcher">
        <img src={ETH} className={chain==='ETH' ? 'active' : ''}/>
        <img src={APT} className={chain==='APT' ? 'active' : ''}/>

        <button onClick={() => setChain("ETH")} className={chain==='ETH' ? 'active' : ''}>ETH</button>
        <button onClick={() => setChain("APT")} className={chain==='APT' ? 'active' : ''}>APT</button>
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
            .sort((a, b) =>  b.score -a.score)
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
    </div>
  );
}
