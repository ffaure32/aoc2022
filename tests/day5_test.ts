import {assertEquals} from "https://deno.land/std@0.166.0/testing/asserts.ts";
import {computePartOne, computePartTwo, parseLine} from "../src/day5.ts";
import {inputLines} from "../src/utils.ts";

Deno.test("sample parse", () => {
    const line = "move 3 from 2 to 9";

    const move = parseLine(line);

    assertEquals(3, move.count);
    assertEquals(2, move.start);
    assertEquals(9, move.end);
});

Deno.test("test day 5 part 1", () => {
    const result = inputLines(5);

    const max = computePartOne(result);

    assertEquals("TLFGBZHCN", max);
});

Deno.test("test day 5 part 1", () => {
    const result = inputLines(5);

    const max = computePartTwo(result);

    assertEquals("QRQFHFWCL", max);
});
