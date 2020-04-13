import express from "express";
import http from "http";
import WebSocket from "ws";
import { Game } from "../game";
import { ConnectionManager } from "./connection";

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const game = new Game();
const connManager = new ConnectionManager();

app.get("*", function (request, response) {
  let connector = http.request(
    "http://localhost:1234/" + request.url,
    function (res) {
      res.pipe(response, { end: true });
    }
  );
  request.pipe(connector, { end: true });
});

wss.on("connection", function connection(ws) {
  connManager.addConnection(ws);
  // ws.on("message", connManager.addConnection(ws));

  ws.on("message", function incoming(data) {
    const msg = data.toString();
    if (msg.includes("pick-tile")) {
      game.players[game.activePlayer].on("pick-tile");
      console.log("player picked a tile");
    }
  });
});

server.listen(3000, function () {
  console.log("listening on *:3000");
});
