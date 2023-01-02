import {BoardMap, parseInput, Position} from "../src/day22.ts";
import {assertEquals} from "https://deno.land/std@0.166.0/testing/asserts.ts";
import {inputLines} from "../src/utils.ts";


Deno.test("move up square 2", () => {
    const lines = inputLines(22);
    const boardMap = new BoardMap(lines.slice(0, lines.length-2));
    boardMap.position = new Position(40, 100, 'U');
    boardMap.move(1);

    assertEquals(50, boardMap.position.x);
    assertEquals(90, boardMap.position.y);
    assertEquals('L', boardMap.position.direction);
});

Deno.test("move up square 2 blocked", () => {
    const lines = inputLines(22);
    const boardMap = new BoardMap(lines.slice(0, lines.length-2));
    boardMap.position = new Position(30, 100, 'U');
    boardMap.move(1);

    assertEquals(30, boardMap.position.x);
    assertEquals(100, boardMap.position.y);
    assertEquals('U', boardMap.position.direction);
});

Deno.test("move left square 4", () => {
    const lines = inputLines(22);
    const boardMap = new BoardMap(lines.slice(0, lines.length-2));
    boardMap.position = new Position(50, 90, 'L');
    boardMap.move(1);

    assertEquals(40, boardMap.position.x);
    assertEquals(100, boardMap.position.y);
    assertEquals('D', boardMap.position.direction);
});

Deno.test("move left square 4 blocked", () => {
    const lines = inputLines(22);
    const boardMap = new BoardMap(lines.slice(0, lines.length-2));
    boardMap.position = new Position(50, 88, 'L');
    boardMap.move(1);

    assertEquals(50, boardMap.position.x);
    assertEquals(88, boardMap.position.y);
    assertEquals('L', boardMap.position.direction);
});

Deno.test("move up square 5", () => {
    const lines = inputLines(22);
    const boardMap = new BoardMap(lines.slice(0, lines.length-2));
    boardMap.position = new Position(51, 0, 'U');
    boardMap.move(1);

    assertEquals(0, boardMap.position.x);
    assertEquals(151, boardMap.position.y);
    assertEquals('R', boardMap.position.direction);
});

Deno.test("move left square 1", () => {
    const lines = inputLines(22);
    const boardMap = new BoardMap(lines.slice(0, lines.length-2));
    boardMap.position = new Position(0, 153, 'L');
    boardMap.move(1);

    assertEquals(53, boardMap.position.x);
    assertEquals(0, boardMap.position.y);
    assertEquals('D', boardMap.position.direction);
});

Deno.test("move up square 6", () => {
    const lines = inputLines(22);
    const boardMap = new BoardMap(lines.slice(0, lines.length-2));
    boardMap.position = new Position(102, 0, 'U');
    boardMap.move(1);

    assertEquals(2, boardMap.position.x);
    assertEquals(199, boardMap.position.y);
    assertEquals('U', boardMap.position.direction);
});

Deno.test("move down square 1", () => {
    const lines = inputLines(22);
    const boardMap = new BoardMap(lines.slice(0, lines.length-2));
    boardMap.position = new Position(2, 199, 'D');
    boardMap.move(1);

    assertEquals(102, boardMap.position.x);
    assertEquals(0, boardMap.position.y);
    assertEquals('D', boardMap.position.direction);
});

Deno.test("move down square 3", () => {
    const lines = inputLines(22);
    const boardMap = new BoardMap(lines.slice(0, lines.length-2));
    boardMap.position = new Position(52, 149, 'D');
    boardMap.move(1);

    assertEquals(49, boardMap.position.x);
    assertEquals(152, boardMap.position.y);
    assertEquals('L', boardMap.position.direction);
});

Deno.test("move right square 1", () => {
    const lines = inputLines(22);
    const boardMap = new BoardMap(lines.slice(0, lines.length-2));
    boardMap.position = new Position(49, 152, 'R');
    boardMap.move(1);

    assertEquals(52, boardMap.position.x);
    assertEquals(149, boardMap.position.y);
    assertEquals('U', boardMap.position.direction);
});

Deno.test("move down square 6", () => {
    const lines = inputLines(22);
    const boardMap = new BoardMap(lines.slice(0, lines.length-2));
    boardMap.position = new Position(102, 49, 'D');
    boardMap.move(1);

    assertEquals(99, boardMap.position.x);
    assertEquals(52, boardMap.position.y);
    assertEquals('L', boardMap.position.direction);
});

Deno.test("move right square 6", () => {
    const lines = inputLines(22);
    const boardMap = new BoardMap(lines.slice(0, lines.length-2));
    boardMap.position = new Position(149, 2, 'R');
    boardMap.move(1);

    assertEquals(99, boardMap.position.x);
    assertEquals(148, boardMap.position.y);
    assertEquals('L', boardMap.position.direction);
});

Deno.test("move right square 3", () => {
    const lines = inputLines(22);
    const boardMap = new BoardMap(lines.slice(0, lines.length-2));
    boardMap.position = new Position(99, 148, 'R');
    boardMap.move(1);

    assertEquals(149, boardMap.position.x);
    assertEquals(2, boardMap.position.y);
    assertEquals('L', boardMap.position.direction);
});

Deno.test("move right square 4", () => {
    const lines = inputLines(22);
    const boardMap = new BoardMap(lines.slice(0, lines.length-2));
    boardMap.position = new Position(99, 52, 'R');
    boardMap.move(1);

    assertEquals(102, boardMap.position.x);
    assertEquals(49, boardMap.position.y);
    assertEquals(49, boardMap.position.y);
    assertEquals('U', boardMap.position.direction);
});


Deno.test("move left square 5", () => {
    const lines = inputLines(22);
    const boardMap = new BoardMap(lines.slice(0, lines.length-2));
    boardMap.position = new Position(50, 2, 'L');
    boardMap.move(1);

    assertEquals(0, boardMap.position.x);
    assertEquals(148, boardMap.position.y);
    assertEquals('R', boardMap.position.direction);
});

Deno.test("move left square 2", () => {
    const lines = inputLines(22);
    const boardMap = new BoardMap(lines.slice(0, lines.length-2));
    boardMap.position = new Position(0, 102, 'L');
    boardMap.move(1);

    assertEquals(50, boardMap.position.x);
    assertEquals(48, boardMap.position.y);
    assertEquals('R', boardMap.position.direction);
});

/*
Deno.test("part 1 sample", () => {
    const lines = inputLines(221);

    const result = parseInput(lines);

    assertEquals(6032, result);
});


Deno.test("move left blocked by wall ", () => {
    const lines = inputLines(221);
    const boardMap = new BoardMap(lines.slice(0, lines.length-2));
    boardMap.position = new Position(10, 0, 'R');
    boardMap.move(1);

    assertEquals(10, boardMap.position.x);
});

Deno.test("move right not blocked by wall ", () => {
    const lines = inputLines(221);
    const boardMap = new BoardMap(lines.slice(0, lines.length-2));
    boardMap.position = new Position(10, 0, 'L');
    boardMap.move(2);

    assertEquals(8, boardMap.position.x);
});

Deno.test("move right blocked by wall on other side", () => {
    const lines = inputLines(221);
    const boardMap = new BoardMap(lines.slice(0, lines.length-2));
    boardMap.position = new Position(10, 0, 'L');
    boardMap.move(4);

    assertEquals(8, boardMap.position.x);
});

Deno.test("move down blocked by wall", () => {
    const lines = inputLines(221);
    const boardMap = new BoardMap(lines.slice(0, lines.length-2));
    boardMap.position = new Position(10, 0, 'D');
    boardMap.move(8);

    assertEquals(6, boardMap.position.y);
});


Deno.test("move down to other side", () => {
    const lines = inputLines(221);
    const boardMap = new BoardMap(lines.slice(0, lines.length-2));
    boardMap.position = new Position(4, 4, 'D');
    boardMap.move(5);

    assertEquals(5, boardMap.position.y);
});
Deno.test("move up to other side", () => {
    const lines = inputLines(221);
    const boardMap = new BoardMap(lines.slice(0, lines.length-2));
    boardMap.position = new Position(4, 4, 'U');
    boardMap.move(5);

    assertEquals(7, boardMap.position.y);
});
Deno.test("move down blocked by wall on other side", () => {
    const lines = inputLines(221);
    const boardMap = new BoardMap(lines.slice(0, lines.length-2));
    boardMap.position = new Position(10, 0, 'U');
    boardMap.move(8);

    assertEquals(8, boardMap.position.y);
});

Deno.test("move down to other side", () => {
    const lines = inputLines(221);
    const boardMap = new BoardMap(lines.slice(0, lines.length-2));
    boardMap.position = new Position(10, 8, 'D');
    boardMap.move(4);

    assertEquals(0, boardMap.position.y);
});

Deno.test("move down to other side", () => {
    const lines = inputLines(221);
    const boardMap = new BoardMap(lines.slice(0, lines.length-2));
    boardMap.position = new Position(10, 8, 'D');
    boardMap.move(4);

    assertEquals(0, boardMap.position.y);
});


Deno.test("move right to other side", () => {
    const lines = inputLines(221);
    const boardMap = new BoardMap(lines.slice(0, lines.length-2));
    boardMap.position = new Position(10, 3, 'R');
    boardMap.move(3);

    assertEquals(9, boardMap.position.x);
});
Deno.test("move left to other side", () => {
    const lines = inputLines(221);
    const boardMap = new BoardMap(lines.slice(0, lines.length-2));
    boardMap.position = new Position(10, 3, 'L');
    boardMap.move(3);

    assertEquals(11, boardMap.position.x);
});
Deno.test("move right simple", () => {
    const lines = inputLines(221);
    const boardMap = new BoardMap(lines.slice(0, lines.length-2));
    boardMap.position = new Position(10, 3, 'R');
    boardMap.move(1);

    assertEquals(11, boardMap.position.x);
});
 */

Deno.test("part 1 real input", () => {
    const lines = inputLines(22);

    const result = parseInput(lines);

    assertEquals(57305, result);
});
