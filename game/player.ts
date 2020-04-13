import { Tile } from "./tiles";
import { Board } from "./board";

export class Player {
  public hand: Tile[];
  private board: Board;
  constructor(board: Board) {
    this.hand = [];
    this.board = board;
  }

  public distributeTiles(tiles: Tile[]) {
    this.hand = tiles;
  }

  public on(action: string) {
    switch (action) {
      case "pick-tile":
        this.board.takeTile(1);
    }
  }
}
