import { Player } from "./player";
import { Board } from "./board";

enum GameState {
  WAITING,
  READY,
  ACTIVE,
  ENDED,
}

export class Game {
  private state: GameState;
  private players: Player[];
  private board: Board;
  private activePlayer: number;

  constructor() {
    this.state = GameState.WAITING;
    this.players = [];
    this.activePlayer = 0;
    this.board = new Board();
  }

  run() {
    while (this.state !== GameState.ENDED) {
      switch (this.state) {
        case GameState.WAITING:
          // when new player detected
          this.players.push(new Player());
          break;
        case GameState.READY:
          for (const player of this.players) {
            player.distributeTiles(this.board.pickFromPile(14));
          }
          break;
        case GameState.ACTIVE:
          this.setActivePlayer();
          break;
        default:
          throw new Error("Unknown game state");
      }
    }
  }

  setActivePlayer() {
    this.activePlayer = this.activePlayer++;
    if (this.activePlayer > this.players.length) {
      this.activePlayer = 0;
    }
  }
}
