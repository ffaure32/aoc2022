import {inputLines} from "../src/utils.ts"
import {assertEquals} from "https://deno.land/std@0.166.0/testing/asserts.ts";
import {computePartOne, computePartTwo} from "../src/day4.ts";

Deno.test("test day 4 part 1", () => {
    const result = inputLines(4);

    const max = computePartOne(result);

    assertEquals(424, max);
});

Deno.test("test day 4 part 2", () => {
    const result = inputLines(4);

    const max = computePartTwo(result);

    assertEquals(804, max);
});

Deno.test("test sample part 2", () => {
    const result = [
        "2-4,6-8",
        "2-3,4-5",
        "5-7,7-9",
        "2-8,3-7",
        "6-6,4-6",
        "2-6,4-8",
    ];

    const max = computePartTwo(result);

    assertEquals(4, max);
});

