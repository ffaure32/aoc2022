class Assignment {
    minSection: number;
    maxSection: number;

    constructor(minSection: number, maxSection: number) {
        this.minSection = minSection;
        this.maxSection = maxSection;
    }

    included(other: Assignment): boolean {
        return this.minSection >= other.minSection && this.maxSection <= other.maxSection
    }

    intersection(other: Assignment): boolean {
        return this.minSection >= other.minSection && this.minSection <= other.maxSection;

    }
}

class ElvesPair {
    firstElf: Assignment;
    secondElf: Assignment;

    constructor(firstElf: Assignment, secondElf: Assignment) {
        this.firstElf = firstElf;
        this.secondElf = secondElf;
    }

    contained(): boolean {
        return this.firstElf.included(this.secondElf)
            || this.secondElf.included(this.firstElf);
    }

    intersected(): boolean {
        return this.firstElf.intersection(this.secondElf)
            || this.secondElf.intersection(this.firstElf);
    }
}

function initElvesPair(line: string): ElvesPair {
    const assignments = line.split(",");
    return new ElvesPair(initAssignment(assignments[0]), initAssignment(assignments[1]));
}

function initAssignment(input: string): Assignment {
    const assignment = input.split("-");
    return new Assignment(Number(assignment[0]), Number(assignment[1]));
}

function getElvesPairs(result: Array<string>) {
    return result
        .map((line) => initElvesPair(line));
}

export function computePartOne(result: Array<string>) {
    return getElvesPairs(result)
        .filter((line) => line.contained())
        .length;
}

export function computePartTwo(result: Array<string>) {
    return getElvesPairs(result)
        .filter((line) => line.intersected())
        .length;
}
