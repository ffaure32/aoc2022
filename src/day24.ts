export class Position {
    targetIndex: number;
    position: [number, number];
    targets: Array<string>;
    newTarget : boolean;

    constructor(targetIndex: number, position: [number, number], targets: Array<string>) {
        this.targetIndex = targetIndex;
        this.position = position;
        this.targets = targets;

        if(this.position.join(',') === this.targets[this.targetIndex]) {
            this.targetIndex += 1;
            this.newTarget = true;
        } else {
            this.newTarget = false;
        }
    }

    exit() {
        return this.targetIndex === this.targets.length;
    }
    positionKey() {
        return ''+this.targetIndex+','+this.position.join(',');
    }

    getTarget() : [number, number] {
        return <[number, number]>this.targets[this.targetIndex].split(',').map(n => Number(n));
    }

    isPositionAccessible(x: number, y: number, maxx: number, maxy: number) {
        const target = this.targets.some(t => t === ''+x+','+y);
        if(target) {
            return true;
        }
        return (x>0 && x<maxx && y > 0 && y<maxy);
    }
    accessiblePositions(maxx: number, maxy: number): Array<[number, number]> {
        const newPositions = new Array<[number, number]>();
        if(this.isPositionAccessible(this.position[0]-1, this.position[1], maxx, maxy)) {
            newPositions.push([this.position[0]-1,this.position[1]]);
        }
        if(this.isPositionAccessible(this.position[0]+1, this.position[1], maxx, maxy)) {
            newPositions.push([this.position[0]+1,this.position[1]]);
        }
        if(this.isPositionAccessible(this.position[0], this.position[1]-1, maxx, maxy)) {
            newPositions.push([this.position[0],this.position[1]-1]);
        }
        if(this.isPositionAccessible(this.position[0], this.position[1]+1, maxx, maxy)) {
            newPositions.push([this.position[0],this.position[1]+1]);
        }
        newPositions.push([this.position[0],this.position[1]]);
        return newPositions;
    }


}

export class BlizzardMap {
    blizzards : Array<Blizzard>;
    maxx: number;
    maxy: number;
    positions: Map<string, Position>;
    targets: Array<string>;
    constructor(lines: string[], multipleTargets : boolean = true) {
        this.blizzards = new Array<Blizzard>();
        for (let y = 1; y < lines.length-1; y++) {
            for (let x = 1; x < lines[y].length-1; x++) {
                if(lines[y].charAt(x) !== '.') {
                    this.blizzards.push(new Blizzard(lines[y].charAt(x), x, y));
                }
            }
        }
        this.maxy = lines.length-1;
        this.maxx = lines[0].length-1;
        this.targets = new Array<string>();
        const start : [number, number] = [1, 0];
        const exit = [this.maxx-1,this.maxy];
        this.targets.push(exit.join(','));
        if(multipleTargets) {
            this.targets.push(start.join(','));
            this.targets.push(exit.join(','));
        }
        this.positions = new Map<string, Position>();
        const startPosition = new Position(0, start, this.targets);
        this.positions.set(startPosition.positionKey(), startPosition);
    }

    step() {
        this.blizzards.forEach(b => b.move(this.maxx, this.maxy));
        const nextPositions = new Array<Position>();
        for (const position of this.positions.values()) {
            const newPositions = position.accessiblePositions(this.maxx, this.maxy);
            const freePositions = newPositions.filter(n => !this.blizzards.some(b => b.x ===n[0] && b.y ===n[1]));
            nextPositions.push(...freePositions.map(p => new Position(position.targetIndex, p, this.targets)));
        }
        this.positions = new Map<string, Position>();
        const promotedPositions = nextPositions.find(np => np.newTarget);
        if(promotedPositions) {
            if(promotedPositions.exit()) {
                return true;
            } else {
                this.positions.set(promotedPositions.positionKey(), promotedPositions);
            }
        } else {
            for (const nextPosition of nextPositions) {
                this.positions.set(nextPosition.positionKey(), nextPosition);
            }
        }
        return false;
    }

    print() {
        console.log("");
        for (let y = 1; y < this.maxy; y++) {
            let line = "";
            for (let x = 1; x < this.maxx; x++) {
                const blizz = this.blizzards.filter(b => b.x ===x && b.y ===y);
                if(blizz.length>1) {
                    line += blizz.length;
                } else if(blizz.length>0) {
                    line+=blizz[0].direction;
                } else {
                    line+='.';
                }
            }
            console.log(line);

        }
    }
}

export class Blizzard {
    direction: String;
    x: number;
    y: number;

    constructor(direction: String, x: number, y: number) {
        this.direction = direction;
        this.x = x;
        this.y = y;
    }

    move(maxx: number, maxy: number) {
        switch (this.direction) {
            case '>':
                this.x +=1;
                if(this.x>=maxx) {
                    this.x = 1;
                }
                break;
            case '<':
                this.x -=1;
                if(this.x<=0) {
                    this.x = maxx-1;
                }
                break;
            case '^':
                this.y -=1;
                if(this.y<=0) {
                    this.y = maxy-1;
                }
                break;
            case 'v':
                this.y +=1;
                if(this.y>=maxy) {
                    this.y = 1;
                }
                break;
        }
    }
}