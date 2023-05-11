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
