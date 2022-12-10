import {assertEquals} from "https://deno.land/std@0.166.0/testing/asserts.ts";
import {inputLines} from "../src/utils.ts";
import {parseInput} from "../src/day10.ts";

Deno.test("sample part 1", () => {
    const lines = inputLines(101);
    const result = parseInput(lines);

    assertEquals(13140, result.totalStrength([20, 60, 100, 140, 180, 220]));
});

Deno.test("test day 10 part 1", () => {
    const lines = inputLines(10);
    const result = parseInput(lines);

    assertEquals(13820, result.totalStrength([20, 60, 100, 140, 180, 220]));
});
