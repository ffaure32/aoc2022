import {assertEquals} from "https://deno.land/std@0.166.0/testing/asserts.ts";
import {parseInput} from "../src/day20.ts";
import {inputLines} from "../src/utils.ts";

Deno.test("part 1 sample 1", () => {
    const lines = [
        "4",
        "-2",
        "5",
        "6",
        "7",
        "8",
        "9",
    ];
    const result = parseInput(lines);
    result.move(1);
    console.log(result.nodeList)
});

Deno.test("part 1 sample 1", () => {
    const lines = [
        "1",
        "-2",
        "4",
        "6",
        "7",
        "8",
        "-9",
    ];
    const result = parseInput(lines);
    result.move(6);
    console.log(result.nodeList)
});

Deno.test("part 1 sample 1", () => {
    const lines = [
        "1",
        "-2",
        "4",
        "6",
        "7",
        "8",
        "-9",
    ];
    const result = parseInput(lines);
    result.move(4);
    console.log(result.nodeList)
});

Deno.test("part 1 sample", () => {
    const lines = [
        "1",
        "2",
        "-3",
        "3",
        "-2",
        "0",
        "4",
    ];
    const result = parseInput(lines);
    result.allMoves();
    assertEquals(3, result.groveCoordinates());
});

Deno.test("part 1 real input", () => {
    const lines = inputLines(20);
    const result = parseInput(lines);
    result.allMoves();
    assertEquals(23321, result.groveCoordinates());
});

Deno.test("part 2 sample", () => {
    const lines = [
        "1",
        "2",
        "-3",
        "3",
        "-2",
        "0",
        "4",
    ];
    const result = parseInput(lines, 811589153);
    result.allMovesTimes(10);
    assertEquals(1623178306, result.groveCoordinates());
})

Deno.test("part 2 real input", () => {
    const lines = inputLines(20);
    const result = parseInput(lines, 811589153);
    result.allMovesTimes(10);
    assertEquals(1428396909280, result.groveCoordinates());
});

