// @ts-ignore
import Game from "./Game.svelte";

let clientId: string | null = localStorage.getItem("clientId");

const socket = new WebSocket("ws://localhost:3000");

socket.addEventListener("open", function (event) {
  socket.send("Hello Server!");
});

socket.addEventListener("message", function (event) {
  const msg = event.data;
  console.log("received", msg, "from server");

  switch (true) {
    case msg === "clientId?":
      socket.send(clientId ? `clientId:${clientId}` : "clientId:none");
      break;
    case msg.startsWith("clientId:"):
      clientId = msg.split(":")[1] as string;
      localStorage.setItem("clientId", clientId);
      break;
  }
});

const game = new Game({
  target: document.getElementById("game"),
  data: {
    name: "world",
    socket,
  },
});
