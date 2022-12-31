import {inputLines} from "../src/utils.ts";
import {Elves, parseInput} from "../src/day23.ts";
import {assertEquals} from "https://deno.land/std@0.166.0/testing/asserts.ts";


Deno.test("part 1 real input", () => {
    const lines = [
        ".......#......",
        ".....###.#....",
        "...#...#.#....",
        "....#...##....",
        "...#.###......",
        "...##.#.##....",
        "....#..#......"
    ]
    // const lines = inputLines(23);

    const result = parseInput(lines);
    const elves = new Elves(result);
    for (let i = 0; i < 10; i++) {
        elves.moveElves();
    }
    assertEquals(110, elves.computeSize());
});

Deno.test("part 1 real input", () => {
    const lines = inputLines(23);

    const result = parseInput(lines);
    const elves = new Elves(result);
    for (let i = 0; i < 10; i++) {
        elves.moveElves();
    }
    assertEquals(4052, elves.computeSize());
});

Deno.test("part 2 sample", () => {
    const lines = [
        ".......#......",
        ".....###.#....",
        "...#...#.#....",
        "....#...##....",
        "...#.###......",
        "...##.#.##....",
        "....#..#......"
    ]
    // const lines = inputLines(23);

    const result = parseInput(lines);
    const elves = new Elves(result);
    let moved = true;
    let index = 0;
    while (moved) {
        moved = elves.moveElves();
        index += 1;
    }
    assertEquals(20, index);
});

Deno.test("part 2 real input", () => {
    const lines = inputLines(23);

    const result = parseInput(lines);
    const elves = new Elves(result);
    let moved = true;
    let index = 0;
    while (moved) {
        moved = elves.moveElves();
        index += 1;
    }
    assertEquals(978, index);
});

