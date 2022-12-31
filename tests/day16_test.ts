import {parseInput, parseInputPart2, parseLine} from "../src/day16.ts";
import {assertEquals} from "https://deno.land/std@0.166.0/testing/asserts.ts";
import {inputLines} from "../src/utils.ts";

Deno.test("parse line", () => {
    const line = 'Valve GA has flow rate=25; tunnels lead to valves SK, SZ';
    const valve = parseLine(line);
    assertEquals(25, valve.flowRate);
    assertEquals('GA', valve.name);
    assertEquals(['SK', 'SZ'], valve.tunnels);
});

Deno.test("parse line with one tunnel", () => {
    const line = 'Valve QN has flow rate=25; tunnel leads to valve SD';
    const valve = parseLine(line);
    assertEquals(25, valve.flowRate);
    assertEquals('QN', valve.name);
    assertEquals(['SD'], valve.tunnels);
});


Deno.test("sample part 1", () => {
    const lines = inputLines(161);
    const valves = parseInput(lines);
    assertEquals(1651, valves.getMaxScore()+1);
});

Deno.test("real input part 1", () => {
    const lines = inputLines(16);
    const valves = parseInput(lines);
    assertEquals(2077, valves.getMaxScore());
});

Deno.test("sample part 2", () => {
    const lines = inputLines(161);
    const valves = parseInputPart2(lines);
    assertEquals(1707, valves.getMaxScore()+1);
});


Deno.test("real input part 2", () => {
    const lines = inputLines(16);
    const valves = parseInputPart2(lines);
    assertEquals(2741, valves.getMaxScore());
});


