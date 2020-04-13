import WebSocket from "ws";
import { v4 as uuid } from "uuid";
import { EventEmitter } from "events";

export class Connection {
  public clientId: string;
  public ws: WebSocket;

  constructor(ws: WebSocket, clientId: string) {
    this.ws = ws;
    this.clientId = clientId;
  }
}

export class ConnectionManager {
  private connections: Connection[] = [];
  private events: EventEmitter = new EventEmitter();

  private initiateConnection(ws: WebSocket, buffer: WebSocket.Data) {
    let clientId: string;
    const msg = buffer.toString();
    switch (true) {
      case msg === "clientId:none":
        clientId = uuid();
        this.connections.push(new Connection(ws, clientId));
        ws.send(`clientId:${clientId}`);
        break;
      case msg.startsWith("clientId:"):
        clientId = msg.split(":")[1];
        const conn = this.connections.find((c) => c.clientId === clientId);
        if (conn) {
          conn.ws = ws;
        } else {
          const clientId = uuid();
          this.connections.push(new Connection(ws, clientId));
          ws.send(`clientId:${clientId}`);
        }
        this.events.emit("connected", this);
    }
  }

  addConnection(ws: WebSocket) {
    ws.send("clientId?");
    ws.on("message", this.initiateConnection.bind(this, ws));
    this.events.on("connected", (connection) => {
      if (connection.ws === ws) {
        ws.off("message", this.initiateConnection);
      }
      ws.send(`Congrats ${connection.clientId}, you're connected!!`);
    });
  }
}
