import {assertEquals} from "https://deno.land/std@0.166.0/testing/asserts.ts";
import {computePartOne, computePartTwo} from "../src/day9.ts";
import {inputLines} from "../src/utils.ts";

Deno.test("sample day 9 part 1", () => {
    const result = [
        "R 4",
        "U 4",
        "L 3",
        "D 1",
        "R 4",
        "D 1",
        "L 5",
        "R 2",
    ];

    const max = computePartOne(result);

    assertEquals(13, max);
});

Deno.test("test day 9 part 1", () => {
    const result = inputLines(9);

    const max = computePartOne(result);

    assertEquals(6494, max);
});


Deno.test("sample day 9 part 2", () => {
    const result = [
        "R 4",
        "U 4",
        "L 3",
        "D 1",
        "R 4",
        "D 1",
        "L 5",
        "R 2",
    ];

    const max = computePartTwo(result);

    assertEquals(1, max);
});

Deno.test("sample 2 day 9 part 2", () => {
    const result = [
        "R 5",
        "U 8",
        "L 8",
        "D 3",
        "R 17",
        "D 10",
        "L 25",
        "U 20",
    ];

    const max = computePartTwo(result);

    assertEquals(36, max);
});

Deno.test("test day 9 part 2", () => {
    const result = inputLines(9);

    const max = computePartTwo(result);

    assertEquals(2691, max);
});

