import "./extensions.ts";

class Knot {
    x: number;
    y : number;

    constructor() {
        this.x = 0;
        this.y = 0;
    }

    up = () => this.y++;
    down = () => this.y--;
    left = () => this.x--;
    right = () => this.x++;

    follow(head: Knot) {
        let horizontalDiff = head.x - this.x;
        let verticalDiff = head.y - this.y;
        let horizontalDistance = Math.abs(horizontalDiff);
        let verticalDistance = Math.abs(verticalDiff);
        if(horizontalDistance<=1 && verticalDistance <=1) return;
        let horizontalDirection = horizontalDiff / horizontalDistance;
        let verticalDirection = verticalDiff / verticalDistance;
        this.x += horizontalDirection || 0;
        this.y += verticalDirection || 0;
    }

    toSTring() {
        return `${this.x} ${this.y}`;
    }
}

class Rope {
    positions : Set<string>;
    knotsCount: number
    knots: Knot[];

    constructor(knots: number) {
        this.positions = new Set<string>();
        this.knotsCount = knots;
        this.knots = new Array<Knot>();
        for (let i = 0; i < this.knotsCount; i++) {
            this.knots.push(new Knot());
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
                head.up();
                break;
            case "D":
                head.down();
                break;
            case "L":
                head.left();
                break;
            case "R":
                head.right();
                break;
        }
    }

    private follow() {
        for (let i = 0; i < this.knotsCount-1; i++) {
            this.followKnot(this.knots[i], this.knots[i+1]);
        }
    }

    private followKnot(head: Knot, tail: Knot) {
        tail.follow(head);
    }

    private addTailToPositions() {
        const tail = this.knots[this.knotsCount-1];
        this.positions.add(tail.toSTring());
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
