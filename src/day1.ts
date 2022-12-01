export class Elf {
    calories: Array<number>;

    constructor(calories: Array<number>) {
        this.calories = calories;
    }

    totalCalories(): number {
        return this.calories.reduce((acc, current) => {return acc + current;}, 0);
    }
}

export function buildInput(result: Array<string>) {
    const elves: Array<Elf> = new Array<Elf>();
    let calories: Array<number> = new Array<number>();
    const ELVES_SEPARATOR = '';
    for (const line in result) {
        let lineContent: string = result[line];
        if (lineContent === ELVES_SEPARATOR) {
            calories = new Array<number>();
            elves.push(new Elf(calories));
        } else {
            calories.push(parseInt(lineContent));
        }
    }
    return elves;
}

export function getMaxEnergizedElves(elves: Array<Elf>, numberOfElves: number = 3) {
    return elves
        .map((elf) => elf.totalCalories())
        .sort((a, b) => (b-a))
        .slice(0, numberOfElves)
        .reduce((acc, current) => {return acc + current;}, 0);
}
