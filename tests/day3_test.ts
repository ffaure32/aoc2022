import {inputLines} from "../src/utils.ts"
import {assertEquals} from "https://deno.land/std@0.166.0/testing/asserts.ts";
import {computePartOne, calculateLineScore, findCommonChar, computePartTwo} from "../src/day3.ts";

Deno.test("sample 1", () => {
    const line = "vJrwpWtwJgWrhcsFMMfFFhFp";

    const score = calculateLineScore(line);

    assertEquals(16, score);
});

Deno.test("sample 2", () => {
    const line = "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL";

    const score = calculateLineScore(line);

    assertEquals(38, score);
});

Deno.test("sample 3", () => {
    const line = "PmmdzqPrVvPwwTWBwg";

    const score = calculateLineScore(line);

    assertEquals(42, score);
});

Deno.test("complete sample", () => {
    const result = [
        "vJrwpWtwJgWrhcsFMMfFFhFp",
        "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
        "PmmdzqPrVvPwwTWBwg",
        "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
        "ttgJtRGJQctTZtZT",
        "CrZsJsPPZsGzwwsLwLmpwMDw"
    ];

    const max = computePartOne(result);

    assertEquals(157, max);

});

Deno.test("sample 1 part 2", () => {
    const result = [
        "vJrwpWtwJgWrhcsFMMfFFhFp",
        "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
        "PmmdzqPrVvPwwTWBwg",
        "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
        "ttgJtRGJQctTZtZT",
        "CrZsJsPPZsGzwwsLwLmpwMDw",
        ""
    ];

    const score = computePartTwo(result);

    assertEquals(70, score);
});

Deno.test("test day 3 part 1", () => {
    const result = inputLines(3);

    const max = computePartOne(result);

    assertEquals(8139, max);
});

Deno.test("test day 3 part 2", () => {
    const result = [
            "pSTfMtMLSTPsPsBszP",
            "jdlmlFHHhVdmVHFNFRnHzHQJsGZBJbbJDvsDRPBsrGrDrJ",
            "VHnFjcdccjlmNVmnzmNVmCMggfqwtLLfSMwWtcWMSg"
        ]
    ;

    const max = findCommonChar(result);

    assertEquals("z", max);
});


Deno.test("test day 3 part 2", () => {
    const result = inputLines(3);

    const max = computePartTwo(result);

    assertEquals(1809, max);
});
