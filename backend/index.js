const express = require("express");
var cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const http = require("http");
const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let scoreboard = {
  team1: {
    name: "Team 1",
    ETH: {
      attack: 1,
      defense: 2,
    },
    APT: {
      attack: 3,
      defense:4,
    },
  },
  team2: {
    name: "Team 2",
    ETH: {
      attack: 5,
      defense: 6,
    },
    APT: {
      attack: 7,
      defense: 8,
    },
  },
};

app.post("/addPoints", (req, res) => {
  const { team, chain, attackPoints, defensePoints } = req.body;
  scoreboard[team][chain].attack += attackPoints;
  scoreboard[team][chain].defense += defensePoints;
  io.emit("scoreboard", scoreboard);
});

app.post("/sudoSetPoints", (req, res) => {
  const { team, chain, attackPoints, defensePoints } = req.body;
  scoreboard[team][chain].attack = attackPoints;
  scoreboard[team][chain].defense = defensePoints;
  io.emit("scoreboard", scoreboard);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.emit("scoreboard", scoreboard);
});

server.listen(3000, () => {
  console.log("listening on *:3000");
  io.emit("scoreboard", scoreboard);
});
