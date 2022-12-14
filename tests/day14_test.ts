import {Waterfall} from "../src/day14.ts";
import {assertEquals} from "https://deno.land/std@0.166.0/testing/asserts.ts";
import {inputLines} from "../src/utils.ts";


Deno.test("real sample part 1", () => {
    let waterfall = new Waterfall();
    const lines = [
        "498,4 -> 498,6 -> 496,6",
        "503,4 -> 502,4 -> 502,9 -> 494,9",
    ];
    lines.forEach(l => waterfall.addLine(l));
    waterfall.pourAllSand();
    assertEquals(24, waterfall.sandCount);
});


Deno.test("sample part 2", () => {
    let waterfall = new Waterfall();
    const lines = [
        "498,4 -> 498,6 -> 496,6",
        "503,4 -> 502,4 -> 502,9 -> 494,9",
        ];
    lines.forEach(l => waterfall.addLine(l));
    waterfall.buildBottom();
    waterfall.pourAllSand();
    assertEquals(93, waterfall.sandCount);
});

Deno.test("real input part 1", () => {
    let waterfall = new Waterfall();
    const lines = inputLines(14);
    lines.forEach(l => waterfall.addLine(l));
    waterfall.pourAllSand();
    assertEquals(1513, waterfall.sandCount);
});

Deno.test("real input part 2", () => {
    let waterfall = new Waterfall();
    const lines = inputLines(14);
    lines.forEach(l => waterfall.addLine(l));
    waterfall.buildBottom();
    waterfall.pourAllSand();
    assertEquals(22646, waterfall.sandCount);
});
