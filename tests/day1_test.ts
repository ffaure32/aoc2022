import {inputLines} from "../src/utils.ts"
import {buildInput, getMaxEnergizedElves} from "../src/day1.ts";
import {assertEquals} from "https://deno.land/std@0.166.0/testing/asserts.ts";

Deno.test("test day 1 part 1", () => {
    const result = inputLines(1);
    const elves = buildInput(result);

    const max = getMaxEnergizedElves(elves, 1);

    assertEquals(73211, max);
});

Deno.test("test day 1 part 2", () => {
    const result = inputLines(1);
    const elves = buildInput(result);

    const max = getMaxEnergizedElves(elves, 3);

    assertEquals(213958, max);
});
