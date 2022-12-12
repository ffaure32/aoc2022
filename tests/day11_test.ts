import {computeMonkeyBusiness, Monkey, operationFn} from "../src/day11.ts";
import {assertEquals} from "https://deno.land/std@0.166.0/testing/asserts.ts";

function initInputSample(relief: operationFn) {
    const monkeyList = new Array<Monkey>();
    monkeyList.push(
        new Monkey([79n, 98n], (bigint) => bigint * 19n, relief,
            23n, 2, 3)
    );
    monkeyList.push(
        new Monkey([54n, 65n, 75n, 74n], (bigint) => bigint + 6n, relief,
            19n, 2, 0)
    );
    monkeyList.push(
        new Monkey([79n, 60n, 97n], (bigint) => bigint * bigint, relief,
            13n, 1, 3)
    );
    monkeyList.push(
        new Monkey([74n], (bigint) => bigint + 3n, relief,
            17n, 0, 1)
    );
    return monkeyList;
}

function initInput(relief: operationFn) {
    const monkeyList = new Array<Monkey>();
    monkeyList.push(
        new Monkey([71n, 86n], (bigint) => bigint * 13n, relief,
            19n, 6, 7)
    );
    monkeyList.push(
        new Monkey([66n,50n, 90n, 53n, 88n, 85n], (bigint) => bigint + 3n, relief,
            2n, 5, 4)
    );
    monkeyList.push(
        new Monkey([97n, 54n, 89n, 62n, 84n, 80n, 63n], (bigint) => bigint + 6n, relief,
            13n, 4, 1)
    );
    monkeyList.push(
        new Monkey([82n, 97n, 56n, 92n], (bigint) => bigint + 2n, relief,
            5n, 6, 0)
    );
    monkeyList.push(
        new Monkey([50n, 99n, 67n, 61n, 86n], (bigint) => bigint * bigint, relief,
            7n, 5, 3)
    );
    monkeyList.push(
        new Monkey([61n, 66n, 72n, 55n, 64n, 53n, 72n, 63n], (bigint) => bigint + 4n, relief,
            11n, 3, 0)
    );
    monkeyList.push(
        new Monkey([59n, 79n, 63n], (bigint) => bigint * 7n, relief,
            17n, 2, 7)
    );
    monkeyList.push(
        new Monkey([55n], (bigint) => bigint + 7n, relief,
            3n, 2, 1)
    );
    return monkeyList;
}


Deno.test("sample part 1", () => {
    const monkeyList = initInputSample((level) => level / 3n);
    const result = computeMonkeyBusiness(monkeyList, 20n);
    assertEquals(10605, result);
});

Deno.test("real input part 1", () => {
    const monkeyList = initInput((level) => level / 3n);
    const result = computeMonkeyBusiness(monkeyList, 20n);
    assertEquals(88208, result);
});

Deno.test("sample part 2", () => {
    const modulo = 23n * 19n * 13n * 17n;
    const monkeyList = initInputSample((level) => level % modulo);
    const result = computeMonkeyBusiness(monkeyList, 5000n);
    assertEquals(26075 * 26000, result);
});

Deno.test("real input part 2", () => {
    const modulo = 19n * 2n * 13n * 5n * 7n * 11n * 17n * 3n;
    const monkeyList = initInput((level: bigint) => level % modulo);
    const result = computeMonkeyBusiness(monkeyList, BigInt(10000));
    assertEquals(21115867968, result);
});