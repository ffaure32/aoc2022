import {assertEquals} from "https://deno.land/std@0.166.0/testing/asserts.ts";
import {computePartOne, computePartTwo, findUniqueCharsSequence} from "../src/day6.ts";
import {inputLines} from "../src/utils.ts";

Deno.test("sample parse", () => {
    const line = "mjqjpqmgbljsphdztnvjfqwrcgsmlb";

    const index = findUniqueCharsSequence(line);

    assertEquals(7, index);
});

Deno.test("sample parse", () => {
    const line = "bvwbjplbgvbhsrlpgdmjqwftvncz";

    const index = findUniqueCharsSequence(line);

    assertEquals(5, index);
});

Deno.test("sample parse", () => {
    const line = "nppdvjthqldpwncqszvftbrmjlhg";

    const index = findUniqueCharsSequence(line);

    assertEquals(6, index);
});

Deno.test("sample parse", () => {
    const line = "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg";

    const index = findUniqueCharsSequence(line);

    assertEquals(10, index);
});

Deno.test("sample parse", () => {
    const line = "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw";

    const index = findUniqueCharsSequence(line);

    assertEquals(11, index);
});



Deno.test("test day 6 part 1", () => {
    const result = inputLines(6);

    const max = computePartOne(result);

    assertEquals(1343, max);
});

Deno.test("test day 5 part 1", () => {
    const result = inputLines(6);

    const max = computePartTwo(result);

    assertEquals(2193, max);
});
