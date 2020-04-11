import { TileGroup, createTile } from "../tiles";

const t1 = createTile({ color: "black", number: 1 });
const t2 = createTile({ color: "blue", number: 1 });
const t3 = createTile({ color: "yellow", number: 1 });
const t4 = createTile({ color: "red", number: 1 });

test("tile group can add tiles", () => {
  const group = new TileGroup();
  expect(group.addToStart([t1, t2])).toEqual([t1, t2]);
});

test("tile group can't add more than 4 tiles", () => {
  const group = new TileGroup();
  expect(group.addToStart([t1, t2, t3, t4, t1])).toBeFalsy();
});
