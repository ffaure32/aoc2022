import {parseInput, getMonkeyChain, computeOwnYell} from "../src/day21.ts";
import {assertEquals} from "https://deno.land/std@0.166.0/testing/asserts.ts";
import {inputLines} from "../src/utils.ts";

Deno.test("part 1 sample", () => {
    const lines = [
        "root: pppw + sjmn",
        "dbpl: 5",
        "cczh: sllz + lgvd",
        "zczc: 2",
        "ptdq: humn - dvpt",
        "dvpt: 3",
        "lfqf: 4",
        "humn: 5",
        "ljgn: 2",
        "sjmn: drzm * dbpl",
        "sllz: 4",
        "pppw: cczh / lfqf",
        "lgvd: ljgn * ptdq",
        "drzm: hmdt - zczc",
        "hmdt: 32",
    ];
    const result = parseInput(lines).monkeys;

    assertEquals(152, result.get("root")!.yell());
})


Deno.test("part 1 real input", () => {
    const lines = inputLines(21);

    const result = parseInput(lines).monkeys;

    assertEquals(331120084396440, result.get("root")!.yell());
});

Deno.test("part 2 sample", () => {
    const lines = [
        "root: pppw + sjmn",
        "dbpl: 5",
        "cczh: sllz + lgvd",
        "zczc: 2",
        "ptdq: humn - dvpt",
        "dvpt: 3",
        "lfqf: 4",
        "humn: 5",
        "ljgn: 2",
        "sjmn: drzm * dbpl",
        "sllz: 4",
        "pppw: cczh / lfqf",
        "lgvd: ljgn * ptdq",
        "drzm: hmdt - zczc",
        "hmdt: 32",
    ];
    const familyTree = getMonkeyChain(lines);
    const result = computeOwnYell(familyTree);

    assertEquals(301, result);
})

Deno.test("part 1 real input", () => {
    const lines = inputLines(21);

    const familyTree = getMonkeyChain(lines);
    const result = computeOwnYell(familyTree);

    assertEquals(3378273370680, result);
});
