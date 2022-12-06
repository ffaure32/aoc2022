export function findUniqueCharsSequence(line: String, charsCount: number = 4): number {
    return ([...Array(line.length).keys()].
        find((i) => new Set(line.slice(i, i + charsCount)).size == charsCount)
        || -1)+charsCount;
}

export function computePartOne(lines: Array<string>): number {
    return findUniqueCharsSequence(lines[0], 4);
}

export function computePartTwo(lines: Array<string>): number {
    return findUniqueCharsSequence(lines[0], 14);
}
