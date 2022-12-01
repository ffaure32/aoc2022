import {readFileSync} from "https://deno.land/std@0.166.0/node/fs.ts";

export function inputFile(dayNumber: number) {
    const decoder = new TextDecoder("utf-8");
    const data = readFileSync('input/day' + dayNumber + '.txt');
    return decoder.decode(data);
}

export function inputLines(dayNumber: number) : Array<string> {
    let fileContent = inputFile(dayNumber);
    return fileContent.split('\r\n');
}

