import {convert, destruct, sum} from "../src/day25.ts";
import {assertEquals} from "https://deno.land/std@0.166.0/testing/asserts.ts";
import {inputLines} from "../src/utils.ts";
import "../src/extensions.ts";

Deno.test("sample 1 decimal", () => {
    const line = '1';

    const result = convert(line);

    assertEquals(1, result);
});

Deno.test("sample 1 decimal", () => {
    const line = '11';

    const result = convert(line);

    assertEquals(6, result);
});

Deno.test("sample 1 decimal", () => {
    const line = '1-';

    const result = convert(line);

    assertEquals(4, result);
});

Deno.test("sample 1 decimal", () => {
    const line = '1=';

    const result = convert(line);

    assertEquals(3, result);
});

Deno.test("sample 1 decimal", () => {
    const line = '1121-1110-1=0';

    const result = convert(line);

    assertEquals(314159265, result);
});

/*Deno.test("sample input", () => {
    const lines = inputLines(251);

    const result = sum(lines);

    assertEquals(result, 4890);
});

Deno.test("sample input", () => {
    const lines = inputLines(251);

    const result = destruct(lines);

    assertEquals(result, '2=-1=0');
});

Deno.test("real input", () => {
    const lines = inputLines(25);

    const result = destruct(lines);

    assertEquals(result, '12');
});

Deno.test("real input", () => {
    const lines = inputLines(25);

    const result = sum(lines);

    assertEquals(result, 36671616971741);
});
*/
Deno.test("real input", () => {
    const lines = ['20=02=120-=-2110-0=1'];

    const result = sum(lines);

    assertEquals(result, 36671616971741);
});
Deno.test("real input", () => {
    const lines = inputLines(25);

    const result = destruct(lines);

    assertEquals(result, '20=02=120-=-2110-0=1');
});
