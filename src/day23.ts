export class Elves {
    elves : Array<Elf>;
    order: Array<string>;

    constructor(elves: Array<Elf>) {
        this.elves = elves;
        this.order = ['N', 'S', 'W', 'E'];
    }

    moveElves() {
        for (const elf of this.elves) {
            elf.moveProposition(this.order);
        }

        const nextPositions = this.elves.map(e => e.nextPlace).map(numbers => numbers.join(','));
        const positionCount = new Map<string, number>();
        for (const nextPosition of nextPositions) {
            const count = positionCount.get(nextPosition) ?? 0;
            positionCount.set(nextPosition, count+1);
        }
        let moved = false;
        for (let i = 0; i < this.elves.length; i++) {
            const nextPosition = nextPositions[i];
            if(positionCount.get(nextPosition) === 1) {
                moved = this.elves[i].move() || moved;
            }
        }
        this.nextOrder();
        return moved;
    }

    private nextOrder() {
        let newOrder = this.order.slice(1);
        newOrder.push(this.order[0])
        this.order = newOrder;
    }

    computeSize() {
        const xes = this.elves.map(e => e.x);
        const yes = this.elves.map(e => e.y);
        const xSize = Math.max(...xes) - Math.min(...xes) +1;
        const ySize = Math.max(...yes) - Math.min(...yes) +1;
        const squareSize = xSize * ySize;
        return squareSize-this.elves.length;
    }
}

export class Elf {
    x: number;
    y: number;

    elves : Array<Elf>;

    nextPlace : [number, number];
    constructor(x: number, y: number, elves: Array<Elf>) {
        this.x = x;
        this.y = y;
        this.elves = elves;
        this.nextPlace = [x, y];
    }

    nextPossibleMove(order: string[]) : [number, number] {
        let hasNorthElves = this.hasNorthElves();
        let hasSouthElves = this.hasSouthElves();
        let hasWestElves = this.hasWestElves();
        let hasEastElves = this.hasEastElves();
        if(hasNorthElves || hasSouthElves || hasWestElves || hasEastElves) {
            for (const orderElement of order) {
                switch (orderElement) {
                    case 'N':
                        if(!hasNorthElves) {
                            return [this.x, this.y-1];
                        }
                        break;
                    case 'S':
                        if(!hasSouthElves) {
                            return [this.x, this.y+1];
                        }
                        break;
                    case 'W':
                        if(!hasWestElves) {
                            return [this.x-1, this.y];
                        }
                        break;
                    case 'E':
                        if(!hasEastElves) {
                            return [this.x+1, this.y];
                        }
                        break;
                }
            }
        }
        return [this.x, this.y];
    }
    moveProposition(order: string[]) {
        this.nextPlace = this.nextPossibleMove(order);
    }

    move() {
        const moved = this.x != this.nextPlace[0] || this.y != this.nextPlace[1];
        this.x = this.nextPlace[0];
        this.y = this.nextPlace[1];
        return moved;
    }
    hasNorthElves() {
        const northElves = this.elves.filter(e => e.y === this.y-1);
        return northElves.some(e => e.x >= this.x-1 && e.x <= this.x+1);
    }
    hasSouthElves() {
        const southElves = this.elves.filter(e => e.y === this.y+1);
        return southElves.some(e => e.x >= this.x-1 && e.x <= this.x+1);
    }

    hasWestElves() {
        const westElves = this.elves.filter(e => e.x === this.x-1);
        return westElves.some(e => e.y >= this.y-1 && e.y <= this.y+1);
    }

    hasEastElves() {
        const eastElves = this.elves.filter(e => e.x === this.x+1);
        return eastElves.some(e => e.y >= this.y-1 && e.y <= this.y+1);
    }
}

export function parseInput(lines: string[]) {
    const elves = new Array<Elf>();
    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[i].length; j++) {
            if(lines[i].charAt(j) === '#') {
                const elf = new Elf(j, i, elves);
                elves.push(elf);
            }

        }
    }
    return elves;
}