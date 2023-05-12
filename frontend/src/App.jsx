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
  dice_gang: pp_dicegang,
  zero_tolerance: pp_zerotolerance,
  nyahello: pp_nyahello,
  idek: pp_idek,
  social_engineering_experts: pp_see,
  hexagon: pp_hexagon,
  fibonhack: pp_fibonhack,
  tower_of_hanoi: pp_towerofhanoi,
};

export default function App() {
  //const [isConnected, setIsConnected] = useState(socket.connected);
  const [scoreboard, setScoreboard] = useState({
    dice_gang: {
      name: "DiceGang",
      slug: "dice_gang",
      ETH: {
        attack: 0,
        defense: 0,
      },
      APT: {
        attack: 0,
        defense: 0,
      },
    },
    zero_tolerance: {
      name: "Zer0Tolerance",
      slug: "zero_tolerance",
      ETH: {
        attack: 0,
        defense: 0,
      },
      APT: {
        attack: 0,
        defense: 0,
      },
    },
    nyahello: {
      name: "nyahello",
      slug: "nyahello",
      ETH: {
        attack: 0,
        defense: 0,
      },
      APT: {
        attack: 0,
        defense: 0,
      },
    },
    idek: {
      name: "idek",
      slug: "idek",
      ETH: {
        attack: 0,
        defense: 0,
      },
      APT: {
        attack: 0,
        defense: 0,
      },
    },
    social_engineering_experts: {
      name: "Social Engineering Experts",
      slug: "social_engineering_experts",
      ETH: {
        attack: 0,
        defense: 0,
      },
      APT: {
        attack: 0,
        defense: 0,
      },
    },
    hexagon: {
      name: "Hexagon",
      slug: "hexagon",
      ETH: {
        attack: 0,
        defense: 0,
      },
      APT: {
        attack: 0,
        defense: 0,
      },
    },
    fibonhack: {
      name: "fibonhack",
      slug: "fibonhack",
      ETH: {
        attack: 0,
        defense: 0,
      },
      APT: {
        attack: 0,
        defense: 0,
      },
    },
    tower_of_hanoi: {
      name: "Tower of Hanoi",
      slug: "tower_of_hanoi",
      ETH: {
        attack: 0,
        defense: 0,
      },
      APT: {
        attack: 0,
        defense: 0,
      },
    },
  });
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
          <img
            alt="coin img"
            src={ETH}
            className={chain === "ETH" ? "active" : ""}
          />
          <img
            alt="coin img"
            src={APT}
            className={chain === "APT" ? "active" : ""}
          />
        </div>

        <div className="textContainer">
          <div className="title">
            {chain === "ETH" && "Web3 Casino"}
            {chain === "APT" && "OtterBank"}
          </div>
          <div className="description">
            {chain === "ETH" &&
              "Attack & Defence on an EVM blockchain. Obtain attack points by winning CHIP tokens from other team’s casinos and gain defence points from patching bugs and protecting the CHIP tokens in your own casino."}
            {chain === "APT" &&
              "Welcome to the official decentralized OtterBank running on the Aptos Blockchain. Protect the house at all cost and you will be rewarded defense points. Bring profit to the house and you will be awarded attack points. Keep in mind that all you actions must stay within the rules or you will be punished. <HKTM, OSEC>"}
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
          <div className="tableCell">Status</div>
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

                  <div className="tableCell">
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
