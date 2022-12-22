import {distressSignal, noBeaconsOnLine, parseLine} from "../src/day15.ts";
import {assertEquals} from "https://deno.land/std@0.166.0/testing/asserts.ts";
import {inputLines} from "../src/utils.ts";

const inputSample = [
    "Sensor at x=2, y=18: closest beacon is at x=-2, y=15",
    "Sensor at x=9, y=16: closest beacon is at x=10, y=16",
    "Sensor at x=13, y=2: closest beacon is at x=15, y=3",
    "Sensor at x=12, y=14: closest beacon is at x=10, y=16",
    "Sensor at x=10, y=20: closest beacon is at x=10, y=16",
    "Sensor at x=14, y=17: closest beacon is at x=10, y=16",
    "Sensor at x=8, y=7: closest beacon is at x=2, y=10",
    "Sensor at x=2, y=0: closest beacon is at x=2, y=10",
    "Sensor at x=0, y=11: closest beacon is at x=2, y=10",
    "Sensor at x=20, y=14: closest beacon is at x=25, y=17",
    "Sensor at x=17, y=20: closest beacon is at x=21, y=22",
    "Sensor at x=16, y=7: closest beacon is at x=15, y=3",
    "Sensor at x=14, y=3: closest beacon is at x=15, y=3",
    "Sensor at x=20, y=1: closest beacon is at x=15, y=3",
];

Deno.test("sample part 1", () => {
    const sensors = inputSample.map(l => parseLine(l));
    const line = 10;
    let noBeacons = noBeaconsOnLine(sensors, line);
    assertEquals(26, noBeacons);
});

Deno.test("real input part 1", () => {
    const lines = inputLines(15);
    const sensors = lines.map(l => parseLine(l));
    let noBeacons = noBeaconsOnLine(sensors, 2000000);
    assertEquals(4724228, noBeacons);
});

Deno.test("sample part 2", () => {
    const sensors = inputSample.map(l => parseLine(l));
    const signal = distressSignal(sensors,0,20);
    assertEquals(56000011, signal);
});

Deno.test("real input part 2", () => {
    const lines = inputLines(15);
    const sensors = lines.map(l => parseLine(l));
    const signal = distressSignal(sensors, 0, 4000000);
    assertEquals(13622251246513, signal);
});
