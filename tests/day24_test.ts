import {BlizzardMap} from "../src/day24.ts";
import {inputLines} from "../src/utils.ts";
import {assertEquals} from "https://deno.land/std@0.166.0/testing/asserts.ts";

Deno.test("part 1 sample", () => {
    const lines = [
        "#.######",
        "#>>.<^<#",
        "#.<..<<#",
        "#>v.><>#",
        "#<^v^^>#",
        "######.#",
    ];
    const blizzard = new BlizzardMap(lines, false);
    let count = 1;
    while(!blizzard.step()) {
        count+=1;
    }
    assertEquals(18, count);
});

Deno.test("part 2 sample", () => {
    const lines = [
        "#.######",
        "#>>.<^<#",
        "#.<..<<#",
        "#>v.><>#",
        "#<^v^^>#",
        "######.#",
    ];
    const blizzard = new BlizzardMap(lines, true);
    let count = 1;
    while(!blizzard.step()) {
        count+=1;
    }
    assertEquals(54, count);
});

Deno.test("part 1 real input", () => {
    const lines = inputLines(24);

    const blizzard = new BlizzardMap(lines, false);
    let count = 1;
    while(!blizzard.step()) {
        count+=1;
    }
    assertEquals(326, count);
});


Deno.test("part 1 real input", () => {
    const lines = inputLines(241);

    const blizzard = new BlizzardMap(lines, false);
    let count = 1;
    while(!blizzard.step()) {
        count+=1;
    }
    assertEquals(326, count);
});

Deno.test("part 2 real input", () => {
    const lines = inputLines(24);

    const blizzard = new BlizzardMap(lines, true);
    let count = 1;
    while(!blizzard.step()) {
        count+=1;
    }
    assertEquals(976, count);
});
