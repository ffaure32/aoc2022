import {inputLines} from "../src/utils.ts";
import {Tetris} from "../src/day17.ts";
import {assertEquals} from "https://deno.land/std@0.166.0/testing/asserts.ts";

Deno.test("parse input sample", () => {
    const line = ">>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>";
    const tetris = new Tetris(line);
    tetris.rocksFall();
    assertEquals(3068, tetris.highestRock);
});

Deno.test("parse input real", () => {
    const lines = inputLines(17);
    const line = lines[0];
    const tetris = new Tetris(line);
    tetris.rocksFall();
    assertEquals(3159, tetris.highestRock);
});

Deno.test("parse input sample", () => {
    // const lines = inputLines(17);
    // const line = lines[0];
    const line = ">>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>";
    const tetris = new Tetris(line, 5000000);
    tetris.rocksFall();
    assertEquals(3068, tetris.highestRock);
});