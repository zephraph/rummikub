import express from "express";
import http from "http";
import WebSocket from "ws";

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

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
  ws.on("message", function incoming(message) {
    console.log("received: %s", message);
  });

  ws.send("something");
});

server.listen(3000, function () {
  console.log("listening on *:3000");
});
