import {inputLines} from "../src/utils.ts";
import {assertEquals} from "https://deno.land/std@0.166.0/testing/asserts.ts";
import {countVisibleExternalFacesOld, countVisibleFaces} from "../src/day18.ts";

Deno.test("part 1 sample 1", () => {
    const lines = [
        "1,1,1",
        "2,1,1"
    ];
    const result = countVisibleFaces(lines);
    assertEquals(10, result);
});

Deno.test("part 1 sample 2", () => {
    const lines = [
        "2,2,2",
        "1,2,2",
        "3,2,2",
        "2,1,2",
        "2,3,2",
        "2,2,1",
        "2,2,3",
        "2,2,4",
        "2,2,6",
        "1,2,5",
        "3,2,5",
        "2,1,5",
        "2,3,5",
    ];
    const result = countVisibleFaces(lines);
    assertEquals(64, result);
});

Deno.test("part 1 real input", () => {
    const lines = inputLines(18);
    const result = countVisibleFaces(lines);
    assertEquals(4512, result);
});

Deno.test("part 2 sample 2", () => {
    // const lines = inputLines(17);
    // const line = lines[0];
    const lines = [
        "2,2,2",
        "1,2,2",
        "3,2,2",
        "2,1,2",
        "2,3,2",
        "2,2,1",
        "2,2,3",
        "2,2,4",
        "2,2,6",
        "1,2,5",
        "3,2,5",
        "2,1,5",
        "2,3,5",
    ];
    const result = countVisibleExternalFacesOld(lines);
    assertEquals(58, result);
});

Deno.test("part 1 real input", () => {
    const lines = inputLines(18);
    const result = countVisibleExternalFacesOld(lines);
    assertEquals(2554, result);
});



