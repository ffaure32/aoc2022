import {parseInput} from "../src/day12.ts";
import {assertEquals} from "https://deno.land/std@0.166.0/testing/asserts.ts";
import {inputLines} from "../src/utils.ts";

Deno.test("sample part 1", () => {
    const input = ["Sabqponm",
                    "abcryxxl",
                    "accszExk",
                    "acctuvwj",
                    "abdefghi"];
    const result = parseInput(input);
    assertEquals(31, result.findShortestPath());
});

Deno.test("real input part 1", () => {

    const input = inputLines(12);
    const result = parseInput(input);
    assertEquals(504, result.findShortestPath());
});

Deno.test("sample part 2", () => {
    const input = ["Sabqponm",
        "abcryxxl",
        "accszExk",
        "acctuvwj",
        "abdefghi"];
    const result = parseInput(input);
    assertEquals(29, result.findShortestFromEnd());
});

Deno.test("real input part 2", () => {

    const input = inputLines(12);
    const result = parseInput(input);
    assertEquals(500, result.findShortestFromEnd());
});