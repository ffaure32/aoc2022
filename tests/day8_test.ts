import {assertEquals} from "https://deno.land/std@0.166.0/testing/asserts.ts";
import {computePartOne, computePartTwo} from "../src/day8.ts";
import {inputLines} from "../src/utils.ts";

/*Deno.test("sample parse", () => {
    const line = "mjqjpqmgbljsphdztnvjfqwrcgsmlb";

    const index = parseInput(line);

    assertEquals(0, index);
});*/

Deno.test("sample day 8 part 1", () => {
    const result = [
        "30373",
        "25512",
        "65332",
        "33549",
        "35390",
    ];

    const max = computePartOne(result);

    assertEquals(21, max);
});

Deno.test("test day 8 part 1", () => {
    const result = inputLines(8);

    const max = computePartOne(result);

    assertEquals(1845, max);
});

Deno.test("sample day 8 part 2", () => {
    const result = [
        "30373",
        "25512",
        "65332",
        "33549",
        "35390",
    ];

    const max = computePartTwo(result);

    assertEquals(8, max);
});

Deno.test("test day 8 part 2", () => {
    const result = inputLines(8);

    const max = computePartTwo(result);

    assertEquals(230112, max);
});
