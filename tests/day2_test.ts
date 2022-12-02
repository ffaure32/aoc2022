import {inputLines} from "../src/utils.ts"
import {assertEquals} from "https://deno.land/std@0.166.0/testing/asserts.ts";
import {computePartOne, computePartTwo} from "../src/day2.ts";

Deno.test("test day 2 part 1", () => {
    const result = inputLines(2);

    const max = computePartOne(result);

    assertEquals(10816, max);
});


Deno.test("test day 2 part 2", () => {
    const result = inputLines(2);

    const max = computePartTwo(result);

    assertEquals(11657, max);
});
