const express = require("express");
var cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const http = require("http");
const server = http.createServer(app);

const secret = require("./secret");

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let scoreboard = {
  team1: {
    name: "DiceGang",
    slug: "team1",
    ETH: {
      attack: 0,
      defense: 0,
    },
    APT: {
      attack: 0,
      defense: 0,
    },
  },
  team2: {
    name: "Zer0Tolerance",
    slug: "team2",
    ETH: {
      attack: 0,
      defense: 0,
    },
    APT: {
      attack: 0,
      defense: 0,
    },
  },
  team3: {
    name: "nyahello",
    slug: "team3",
    ETH: {
      attack: 0,
      defense: 0,
    },
    APT: {
      attack: 0,
      defense: 0,
    },
  },
  team4: {
    name: "idek",
    slug: "team4",
    ETH: {
      attack: 0,
      defense: 0,
    },
    APT: {
      attack: 0,
      defense: 0,
    },
  },
  team5: {
    name: "Social Engineering Experts",
    slug: "team5",
    ETH: {
      attack: 0,
      defense: 0,
    },
    APT: {
      attack: 0,
      defense: 0,
    },
  },
  team6: {
    name: "Hexagon",
    slug: "team6",
    ETH: {
      attack: 0,
      defense: 0,
    },
    APT: {
      attack: 0,
      defense: 0,
    },
  },
  team10: {
    name: "fibonhack",
    slug: "team7",
    ETH: {
      attack: 0,
      defense: 0,
    },
    APT: {
      attack: 0,
      defense: 0,
    },
  },
  team8: {
    name: "Tower of Hanoi",
    slug: "team8",
    ETH: {
      attack: 0,
      defense: 0,
    },
    APT: {
      attack: 0,
      defense: 0,
    },
  },
};

app.post("/addPoints", protected, (req, res) => {
  const { team, chain, attackPoints, defensePoints, fixStatus } = req.body;
  scoreboard[team][chain].attack += parseInt(attackPoints);
  scoreboard[team][chain].defense += parseInt(defensePoints);
  if (fixStatus) {
    scoreboard[team][chain].fixStatus = fixStatus;
  }
  io.emit("scoreboard", scoreboard);
  res.send("OK");
});

app.post("/sudoSetPoints", protected, (req, res) => {
  const { team, chain, attackPoints, defensePoints, fixStatus } = req.body;
  scoreboard[team][chain].attack = parseInt(attackPoints);
  scoreboard[team][chain].defense = parseInt(defensePoints);
  if (fixStatus) {
    scoreboard[team][chain].fixStatus = fixStatus;
  }
  io.emit("scoreboard", scoreboard);
  res.send("OK");
});

app.post("/import", protected, (req, res) => {
  scoreboard = req.body.scoreboard;
  io.emit("scoreboard", scoreboard);
  res.send("OK");
});

app.get("/export", (req, res) => {
  res.json(scoreboard);
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.emit("scoreboard", scoreboard);
});

server.listen(3000, () => {
  console.log("listening on *:3000");
  io.emit("scoreboard", scoreboard);
});

// pw protection middleware
function protected(req, res, next) {
  if (req.body.secret !== secret) {
    return res.send("No!");
  } else {
    next();
  }
}
