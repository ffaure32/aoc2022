import {compare, orderLines, sumValidLinesIndex} from "../src/day13.ts";
import {assertEquals} from "https://deno.land/std@0.166.0/testing/asserts.ts";
import {inputLines} from "../src/utils.ts";

Deno.test("compare simple", () => {
    assertEquals(true, compare([1,1,3,1,1],[1,1,5,1,1])>0);
    assertEquals(true, compare([[1],[2,3,4]],[[1],4])>0);
    assertEquals(false, compare([9],[[8,7,6]])>0);
    assertEquals(true, compare([[4,4],4,4],[[4,4],4,4,4])>0);
    assertEquals(false, compare([7,7,7,7],[7,7,7])>0);
    assertEquals(true, compare([],[3])>0);
    assertEquals(false, compare(eval('[[[]]]'),eval('[[]]'))>0);
    assertEquals(false, compare(eval('[1,[2,[3,[4,[5,6,7]]]],8,9]'),eval('[1,[2,[3,[4,[5,6,0]]]],8,9]'))>0);
});

const sampleInput = [
    '[1,1,3,1,1]',
    '[1,1,5,1,1]',
    '',
    '[[1],[2,3,4]]',
    '[[1],4]',
    '',
    '[9]',
    '[[8,7,6]]',
    '',
    '[[4,4],4,4]',
    '[[4,4],4,4,4]',
    '',
    '[7,7,7,7]',
    '[7,7,7]',
    '',
    '[]',
    '[3]',
    '',
    '[[[]]]',
    '[[]]',
    '',
    '[1,[2,[3,[4,[5,6,7]]]],8,9]',
    '[1,[2,[3,[4,[5,6,0]]]],8,9]'
];
Deno.test("compare simple", () => {
    assertEquals(13, sumValidLinesIndex(sampleInput));
});
Deno.test("sample part 2", () => {
    assertEquals(140, orderLines(sampleInput));
});

Deno.test("real input part 1", () => {
    const input = inputLines(13);
    assertEquals(6076, sumValidLinesIndex(input));
});

Deno.test("real input part 1", () => {
    const input = inputLines(13);
    assertEquals(24805, orderLines(input));
});
