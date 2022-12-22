class Rock {
    left: number;
    height: number;

    constructor(height: number)
    {
        this.left = 2;
        this.height = height +3;
    }

    occupiedCoords() {
        return new Array<Array<number>>();
    }

    pushLeft() {
        if(this.left>0) {
            this.left--;
        }
    }

    pushRight() {
        if(this.left+this.maxLeft()<7) {
            this.left++;
        }
    }

    maxLeft() {
        return 0;
    }

    maxHeight() {
        return this.height+1;
    }
}

class Minus extends Rock {
    constructor(height: number)
    {
        super(height);
    }

    occupiedCoords(): Array<Array<number>> {
        return [
            [this.left, this.height],
            [this.left + 1, this.height],
            [this.left + 2, this.height],
            [this.left + 3, this.height]
        ];
    }
    maxLeft(): number {
        return 4;
    }
    maxHeight(): number {
        return super.maxHeight();
    }
}

class Plus extends Rock {
    constructor(height: number)
    {
        super(height);
    }

    occupiedCoords(): Array<Array<number>> {
        return [
            [this.left + 2, this.height + 1],
            [this.left + 1, this.height + 2],
            [this.left + 1, this.height + 1],
            [this.left + 1, this.height],
            [this.left, this.height +1]
        ];
    }
    maxLeft(): number {
        return 3;
    }
    maxHeight(): number {
        return super.maxHeight()+2;
    }
}


class Edge extends Rock {
    constructor(height: number)
    {
        super(height);
    }

    occupiedCoords(): Array<Array<number>> {
        return [
            [this.left + 2, this.height + 2],
            [this.left + 2, this.height + 1],
            [this.left + 2, this.height],
            [this.left + 1, this.height],
            [this.left, this.height]
        ];
    }
    maxLeft(): number {
        return 3;
    }
    maxHeight(): number {
        return super.maxHeight()+2;
    }

}

class VerticalLine extends Rock {
    constructor(height: number)
    {
        super(height);
    }

    occupiedCoords(): Array<Array<number>> {
        return [
            [this.left, this.height + 3],
            [this.left, this.height + 2],
            [this.left, this.height + 1],
            [this.left, this.height]
        ];
    }
    maxLeft(): number {
        return 1;
    }
    maxHeight(): number {
        return super.maxHeight()+3;
    }

}

class Square extends Rock {
    constructor(height: number)
    {
        super(height);
    }

    occupiedCoords(): Array<Array<number>> {
        return [
            [this.left, this.height],
            [this.left, this.height + 1],
            [this.left + 1, this.height],
            [this.left + 1, this.height + 1]
        ];
    }
    maxLeft(): number {
        return 2;
    }
    maxHeight(): number {
        return super.maxHeight()+1;
    }

}


export class Tetris {
    highestRock: number;
    left: number;
    round: number;
    occupiedRocks: Array<Set<number>>;
    moves:String;
    moveIndex: number;
    rocksCount: number;
    moduloRocks: Array<Set<number>>;
    constructor(moves: string, rocksCount = 2022) {
        this.highestRock = 0;
        this.left = 2;
        this.round = 0;
        this.moves = moves;
        this.moveIndex = 0;
        this.occupiedRocks = new Array<Set<number>>();
        for (let i = 0; i < 7; i++) {
            this.occupiedRocks[i] = new Set<number>();
        }
        this.moduloRocks = new Array<Set<number>>();
        for (let i = 0; i < 5; i++) {
            this.moduloRocks[i] = new Set<number>();
        }
        this.rocksCount = rocksCount;
    }

    rocksFall() {
        for (let i = 0; i < this.rocksCount; i++) {
            if(this.moduloRocks[i%5].has(this.moveIndex)) {
                for (let j = 0; j < this.highestRock; j++) {
                    const fullLine = this.occupiedRocks.every(col => col.has(j));
                    if(fullLine && j>this.highestRock-3) {
                        console.log("colonne remplie: "+i+" "+j+" "+this.highestRock);
                    }
                }
            } else {
                this.moduloRocks[i%5].add(this.moveIndex);
            }
            this.nextRock();
        }
    }
    nextRock() {
        let rock = this.newRock()!;
        let blocked = false;
        while (!blocked) {
            this.push(rock);
            blocked = this.fall(rock);
            this.moveIndex+=1;
            if(this.moveIndex===this.moves.length) {
                this.moveIndex=0;
            }
        }
        for(const xy of rock.occupiedCoords()) {
            this.occupiedRocks[xy[0]].add(xy[1]);
        }
        this.highestRock = Math.max(this.highestRock, rock.maxHeight());
        this.round++;
    }


    private push(rock: Rock) {
        const move = this.moves.charAt(this.moveIndex);
        let occupied = false;
        for(const xy of rock.occupiedCoords()) {
            if(move === '>') {
                if(xy[0]==6 || this.occupiedRocks[xy[0]+1].has(xy[1])) {
                    occupied = true;
                    break;
                }
            } else {
                if(xy[0]==0 || this.occupiedRocks[xy[0]-1].has(xy[1])) {
                    occupied = true;
                    break;
                }
            }
        }
        if(occupied) {
            return;
        }

        if(move === '>') {
            rock.pushRight();
        } else {
            rock.pushLeft();
        }
    }

    private fall(rock: Rock) {
        let occupied = false;
        for(const xy of rock.occupiedCoords()) {
            if(xy[1] == 0 || this.occupiedRocks[xy[0]].has(xy[1]-1)) {
                occupied = true;
                break;
            }
        }
        if(!occupied) {
            rock.height-=1;
        } else {
        }
        return occupied;
    }


    newRock() {
        switch (this.round % 5) {
            case 0:
                return new Minus(this.highestRock);
            case 1:
                return new Plus(this.highestRock);
            case 2:
                return new Edge(this.highestRock);
            case 3:
                return new VerticalLine(this.highestRock);
            case 4:
                return new Square(this.highestRock);
        }
    }
}