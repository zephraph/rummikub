import { Tile } from "./tiles";

export class Player {
  public hand: Tile[];
  constructor() {
    this.hand = [];
  }

  public distributeTiles(tiles: Tile[]) {
    this.hand = tiles;
  }
}
