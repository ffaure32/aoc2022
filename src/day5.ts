import {Stack} from "./stack.ts";

class Move {
    start: number;
    end: number;
    count: number;

    constructor(count: number, start: number, end: number) {
        this.count = count;
        this.start = start;
        this.end = end;
    }
}

class Crates {
    stacks: Array<Stack>;

    constructor() {
        this.stacks = new Array<Stack>();
        this.stacks.push(new Stack(['T', 'D', 'W', 'Z', 'V', 'P']));
        this.stacks.push(new Stack(['L', 'S', 'W', 'V', 'F', 'D', 'J']));
        this.stacks.push(new Stack(['Z', 'M', 'L', 'S', 'V', 'T', 'B', 'H']));
        this.stacks.push(new Stack(['R', 'S', 'J']));
        this.stacks.push(new Stack(['C', 'Z', 'B', 'G', 'F', 'M', 'L', 'W']));
        this.stacks.push(new Stack(['Q', 'W', 'V', 'H', 'Z', 'R', 'G', 'B']));
        this.stacks.push(new Stack(['V', 'J', 'P', 'C', 'B', 'D', 'N']));
        this.stacks.push(new Stack(['P', 'T', 'B', 'Q']));
        this.stacks.push(new Stack(['H', 'G', 'Z', 'R', 'C']));
    }

    moveCrate(move: Move) {
        for (let i = 0; i < move.count; i++) {
            const toMove = this.stacks[move.start - 1].pop();
            this.stacks[move.end - 1].push(toMove);
        }
    }

    moveCrateReverse(move: Move) {
        const crates = new Array<string>();
        for (let i = 0; i < move.count; i++) {
            crates.push(this.stacks[move.start - 1].pop());
        }
        for (let i = move.count - 1; i >= 0; i--) {
            this.stacks[move.end - 1].push(crates[i]);
        }
    }

    completed() {
        let result = "";
        for (let i = 0; i < this.stacks.length; i++) {
            result += this.stacks[i].peek();
        }
        return result;
    }
}

export function parseLine(line: String): Move {
    const parts = line.split(" ");
    return new Move(Number(parts[1]), Number(parts[3]), Number(parts[5]));
}

export function computePartOne(lines: Array<string>): string {
    const crates = new Crates();
    lines.filter((s) => s !== '')
        .map(parseLine)
        .forEach((move) => crates.moveCrate(move));
    return crates.completed();
}

export function computePartTwo(lines: Array<string>): string {
    const crates = new Crates();
    lines.filter((s) => s !== '')
        .map(parseLine)
        .forEach((move) => crates.moveCrateReverse(move));
    return crates.completed();
}
