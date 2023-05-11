import React, { useState, useEffect } from "react";
import { socket } from "./socket";
import "./App.scss";
import ETH from "./assets/ETH.png";
import APT from "./assets/APT.png";
// import mehoy from './assets/mehoy.png'
import pp_dicegang from "./assets/dicegang.png";
import pp_zerotolerance from "./assets/zerotolerance.png";
import pp_nyahello from "./assets/nyahello.png";
import pp_idek from "./assets/idek.png";
import pp_see from "./assets/see.png";
import pp_hexagon from "./assets/hexagon.png";
import pp_fibonhack from "./assets/fibonhack.png";
import pp_towerofhanoi from "./assets/towerofhanoi.png";

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
  const [scoreboard, setScoreboard] = useState([]);
  const [chain, setChain] = useState("ETH");

  useEffect(() => {
    function onConnect() {
      //setIsConnected(true);
    }

    function onDisconnect() {
      //setIsConnected(false);
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

  return (
    <div className="App">
      <div className="topBar">
        <div className="chainButtonsContainer">
          <button
            onClick={() => setChain("ETH")}
            className={chain === "ETH" ? "active" : ""}
          >
            ETH
          </button>
          <button
            onClick={() => setChain("APT")}
            className={chain === "APT" ? "active" : ""}
          >
            APT
          </button>
        </div>

        <div className="imageContainer">
          <img alt="coin img" src={ETH} className={chain === "ETH" ? "active" : ""} />
          <img alt="coin img" src={APT} className={chain === "APT" ? "active" : ""} />
        </div>

        <div className="textContainer">
          <div className="title">HackTM A&D Scoreboard</div>
          <div className="description">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Consequatur molestias sapiente assumenda voluptatum delectus,
            eligendi iste aut necessitatibus dolorum, placeat tempora quae
            voluptas nam ipsa pariatur veritatis. Accusamus suscipit adipisci
            voluptatibus qui. Error ratione quidem aliquid voluptatibus, laborum
            beatae odio quasi? Facilis deserunt quod minus ullam nostrum
            blanditiis nulla quos.
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
          <div className="tableCell small"></div>
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
                    <img alt={value.name} src={images[value.slug]} />
                    {value.name}
                  </div>
                  <div className="tableCell">{value[chain].attack}</div>
                  <div className="tableCell">{value[chain].defense}</div>
                  <div className="tableCell">{value.score}</div>

                  <div className="tableCell small">
                    <div
                      className={"fixStatus " + value[chain].fixStatus}
                    ></div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      <footer>
        fashioned by{" "}
        <b>
          <a href="http://www.mihaic.me" target="_blank" rel="noreferrer">
            www.mihaic.me
          </a>
        </b>
      </footer>
    </div>
  );
}
