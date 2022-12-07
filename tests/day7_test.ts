import {buildFileSystem} from "../src/day7.ts";
import {assertEquals} from "https://deno.land/std@0.166.0/testing/asserts.ts";
import {inputLines} from "../src/utils.ts";

Deno.test("complete sample", () => {
    const lines = [
    "$ cd /",
    "$ ls",
    "dir a",
    "14848514 b.txt",
    "8504156 c.dat",
    "dir d",
    "$ cd a",
    "$ ls",
    "dir e",
    "29116 f",
    "2557 g",
    "62596 h.lst",
    "$ cd e",
    "$ ls",
    "584 i",
    "$ cd ..",
    "$ cd ..",
    "$ cd d",
    "$ ls",
    "4060174 j",
    "8033020 d.log",
    "5626152 d.ext",
    "7214296 k"
    ];
    const fs = buildFileSystem(lines);

    assertEquals(95437, fs.totalSize());
    assertEquals(8381165, fs.spaceToFree());
    assertEquals(24933642, fs.findSpaceFreed());
});


Deno.test("test day 7 part 1", () => {
    const result = inputLines(7);

    const fs = buildFileSystem(result);

    assertEquals(1642503, fs.totalSize());
});

Deno.test("test day 5 part 1", () => {
    const result = inputLines(7);

    const fs = buildFileSystem(result);

    assertEquals(6999588, fs.findSpaceFreed());
});

