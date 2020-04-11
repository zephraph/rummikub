import * as Tile from "./tiles";

type TileType = Tile.Tile;

export class Board {
  private pile: TileType[];

  constructor() {
    this.pile = this.initializeTiles();
  }

  private initializeTiles(): TileType[] {
    let unshuffledTiles: TileType[] = [];

    for (let i = 0; i < 2; i++) {
      Tile.colors.forEach((color) =>
        Tile.numbers.forEach((number) => {
          unshuffledTiles.push(Tile.createTile({ color, number }));
        })
      );
      unshuffledTiles.push(Tile.createTile(Tile.JOKER));
    }
    return this.shuffleTiles(unshuffledTiles);
  }

  private shuffleTiles(tiles: TileType[]): TileType[] {
    for (let i = tiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
    return tiles;
  }

  public pickFromPile(count: number): TileType[] {
    let pickedTiles = new Array(count);
    for (let i = 0; i < count; i++) {
      if (this.pile.length < 1) {
        throw new Error("No more tiles left in the pile");
      } else {
        pickedTiles.push(this.pile.shift());
      }
    }
    return pickedTiles;
  }
}
