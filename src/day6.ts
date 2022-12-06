export function findUniqueCharsSequence(line: String, charsCount: number = 4): number {
    for (let i = 0; i < line.length; i++) {
        let newChars = line.slice(i, i+charsCount);
        let uniqueChars = new Set(newChars.split(''));
        if(uniqueChars.size == charsCount) {
            return i+charsCount;
        }
    }
    return -1;
}

export function computePartOne(lines: Array<string>): number {
    return findUniqueCharsSequence(lines[0], 4);
}

export function computePartTwo(lines: Array<string>): number {
    return findUniqueCharsSequence(lines[0], 14);
}
