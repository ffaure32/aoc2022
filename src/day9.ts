import "./extensions.ts";

class Rope {
    positions : Set<string>;
    knotsCount: number
    knots: [number, number][];

    constructor(knots: number) {
        this.positions = new Set<string>();
        this.knotsCount = knots;
        this.knots = new Array<[number, number]>();
        for (let i = 0; i < this.knotsCount; i++) {
            this.knots.push([0, 0]);
        }
        this.addTailToPositions();
    }

    public move(line: string) {
        const move = line.split(' ');
        const direction = move[0];
        const steps = Number(move[1]);

        for (let i = 0; i < steps; i++) {
            this.step(direction);
        }
    }

    public step(direction: string) {
        this.moveHead(direction);
        this.follow();
        this.addTailToPositions();
    }

    private moveHead(direction: string) {
        let head = this.knots[0];
        switch (direction) {
            case "U":
                this.knots[0] = [head[0], head[1] + 1];
                break;
            case "D":
                this.knots[0] = [head[0], head[1] - 1];
                break;
            case "L":
                this.knots[0] = [head[0] - 1, head[1]];
                break;
            case "R":
                this.knots[0] = [head[0] + 1, head[1]];
                break;
        }
    }

    private follow() {
        for (let i = 0; i < this.knotsCount-1; i++) {
            this.knots[i+1] = this.followKnot(this.knots[i], this.knots[i+1]);
        }
    }

    private followKnot(head: [number, number], tail: [number, number]) {
        let horizontalDiff = head[0] - tail[0];
        let verticalDiff = head[1] - tail[1];
        let horizontalDistance = Math.abs(horizontalDiff);
        let verticalDistance = Math.abs(verticalDiff);
        let horizontalDirection = horizontalDiff / horizontalDistance;
        let verticalDirection = verticalDiff / verticalDistance;
        if (horizontalDistance >= 2) {
            tail[0] = tail[0] + horizontalDirection;
            if (verticalDistance >= 1) {
                tail[1] = tail[1] + verticalDirection;
            }
        } else if (verticalDistance >= 2) {
            tail[1] = tail[1] + verticalDirection;
            if (horizontalDistance >= 1) {
                tail[0] = tail[0] + horizontalDirection;
            }
        }
        return tail;
    }

    private addTailToPositions() {
        const tail = this.knots[this.knotsCount-1];
        const position = tail[0]+','+tail[1];
        this.positions.add(position);
    }


}
export function parseInput(lines: Array<string>, ropeSize: number) : Rope {
    let rope = new Rope(ropeSize);
    lines.forEach(l => rope.move(l));
    return rope;
}

export function computePartOne(lines: Array<string>): number {
    const rope = parseInput(lines,2);
    return rope.positions.size;
}

export function computePartTwo(lines: Array<string>): number {
    const rope = parseInput(lines, 10);
    return rope.positions.size;
}
