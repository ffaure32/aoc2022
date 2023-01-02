import {BuilderMap, parseInput} from "../src/day19.ts";
import {assertEquals} from "https://deno.land/std@0.166.0/testing/asserts.ts";
import {inputLines} from "../src/utils.ts";

Deno.test("part 1 parse", () => {
    const lines = inputLines(19);
    const result = parseInput(lines);
    assertEquals(30, result.length);
});

Deno.test("part 1 first sample", () => {
    const lines = ["Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian."];
    const result = parseInput(lines);
    let builderMap = new BuilderMap(result[0]);
    let maxGeode = builderMap.buildLoop();
    assertEquals(9, maxGeode);
});

Deno.test("part 1 second sample", () => {
    const lines = ["Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.",
        "Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian."];
    const result = parseInput(lines);
    let builderMap = new BuilderMap(result[1]);
    let maxGeode = builderMap.buildLoop();
    assertEquals(12, maxGeode);
});

Deno.test("part 1 sample", () => {
    const lines = ["Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.",
        "Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian."];
    const result = parseInput(lines);
    const qualityLevel = result.map(b => new BuilderMap(b)).map(bm => bm.buildLoop()*bm.blueprint.blueprintNumber).sum();
    assertEquals(33, qualityLevel);
});

Deno.test("part 1 real input", () => {
    const lines = inputLines(19);
    const result = parseInput(lines);
    const qualityLevel = result.map(b => new BuilderMap(b, 24, 100000)).map(bm => bm.buildLoop()*bm.blueprint.blueprintNumber).sum();
    assertEquals(1346, qualityLevel);
});
Deno.test("part 2 sample", () => {
    const lines = ["Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.",
        "Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian."];
    const result = parseInput(lines);
    const qualityLevel = result.map(b => new BuilderMap(b, 32, 5000, true)).map(bm => bm.buildLoop());
    assertEquals(56, qualityLevel[0]);
    assertEquals(62, qualityLevel[1]);
});

Deno.test("part 2 real input", () => {
    const lines = inputLines(19);
    const result = parseInput(lines);
    const qualityLevel = result.slice(0,3).map(b => new BuilderMap(b, 32, 5000, true)).map(bm => bm.buildLoop());
    assertEquals(7644, qualityLevel[0]*qualityLevel[1]*qualityLevel[2]);
});
