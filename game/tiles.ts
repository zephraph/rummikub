export const colors = ["black", "blue", "red", "yellow"] as const;
export const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] as const;
export const JOKER = "JOKER";

export type Tile = JokerTile | NumberTile;
export type TileColor = typeof colors[number];
export type TileNumber = typeof numbers[number];

export class JokerTile {
  isJoker() {
    return true;
  }
}

export class NumberTile {
  public color: TileColor;
  public number: TileNumber;

  constructor(color: TileColor, number: TileNumber) {
    this.color = color;
    this.number = number;
  }

  isJoker() {
    return false;
  }
}

export function createTile(value: typeof JOKER): JokerTile;
export function createTile(params: {
  color: TileColor;
  number: TileNumber;
}): NumberTile;
export function createTile(
  param: { color: TileColor; number: TileNumber } | typeof JOKER
) {
  if (param === JOKER) {
    return new JokerTile();
  } else {
    return new NumberTile(param.color, param.number);
  }
}

/**
 * Playing a group or a run makes a **set**
 */
abstract class TileSet {
  protected tiles: Tile[];
  constructor() {
    this.tiles = [];
  }
  protected normalizeTilesToArray(tiles: Tile | Tile[]): Tile[] {
    return Array.isArray(tiles) ? (tiles as Tile[]) : ([tiles] as Tile[]);
  }
  addToStart(tiles: Tile | Tile[]) {
    this.tiles.unshift(...this.normalizeTilesToArray(tiles));
  }
  addToEnd(tiles: Tile | Tile[]) {
    this.tiles = this.tiles.concat(tiles);
  }
  abstract validate(): boolean;
}

/**
 * A **group** is formed when three or four tiles of the same numbers are put together
 */
export class TileGroup extends TileSet {
  addToStart(tiles: Tile | Tile[]) {
    tiles = this.normalizeTilesToArray(tiles);
    if (this.tiles.length + tiles.length > 4) {
      return false;
    }
    super.addToStart(tiles);
    return this.tiles;
  }
  validate() {
    return true;
  }
}

/**
 * A **run** is formed when three or more numbers of the same color are played together
 */
export class TileRun extends TileSet {
  validate() {
    return true;
  }
}
