function turnLeft(commands: string, nextLeft: number, boardMap: BoardMap) {
    const forward = Number(commands.slice(0, nextLeft));
    boardMap.move(forward);
    boardMap.changeDirection('L');
    return commands.slice(nextLeft + 1);
}

function turnRight(commands: string, nextRight: number, boardMap: BoardMap) {
    const forward = Number(commands.slice(0, nextRight));
    boardMap.move(forward);
    boardMap.changeDirection('R');
    return commands.slice(nextRight + 1);
}

export function parseInput(input: string[]) {
    const boardMap = new BoardMap(input.slice(0, input.length-2));
    let commands = input[input.length-1];
    while(commands.length>0) {
        let nextRight = commands.indexOf('R');
        let nextLeft = commands.indexOf('L');
        if(nextLeft === -1 && nextRight === -1) {
            boardMap.move(Number(commands));
            console.log(commands);
            break;
        } else if(nextRight === -1) {
            commands = turnLeft(commands, nextLeft, boardMap);
        } else if(nextLeft === -1) {
            commands = turnRight(commands, nextRight, boardMap);
        } else if(nextRight< nextLeft) {
            commands = turnRight(commands, nextRight, boardMap);
        } else {
            commands = turnLeft(commands, nextLeft, boardMap);
        }
    }
    return boardMap.position.finalPassword();
}

function padLeft(toPad: string, length: number) {
    let result = toPad;
    for (let i = 0; i < length-toPad.length; i++) {
        result+=' ';
    }
    return result;
}
export class BoardMap {
    tiles: Array<Array<string>>;
    position: Position;


    constructor(lines: string[]) {
        const longestLine = Math.max(...lines.map(l => l.length));
        this.tiles = lines.map(l => padLeft(l, longestLine).split(''));
        const firstTile = this.tiles[0].indexOf('.');
        this.position = new Position(firstTile, 0, 'R');
    }

    move(forward: number) {
        let tile = '';
        for (let i = 0; i < forward; i++) {
            let nextPosition = this.position.next();
            let target = [nextPosition.x, nextPosition.y];
            tile = this.tiles[target[1]][target[0]];
            if(tile === '#') {
                break;
            } else if(tile === '.') {
                this.position = nextPosition;
            }
        }
    }

    changeDirection(turn: string) {
        if(turn === 'L') {
            this.position.turnLeft();
        } else {
            this.position.turnRight();
        }
    }
}
const side = 50;

export class Position {
    x: number;
    y: number;
    direction: string;

    constructor(x: number, y: number, direction: string) {
        this.x = x;
        this.y = y;
        this.direction = direction;
    }

    next(): Position {
        switch (this.direction) {
            case 'U':
                if((this.y-1)<0) {
                    if(this.x<side * 2) {
                        return new Position(0, this.x+side * 2, 'R'); // 5 U -> 1 R
                    } else {
                        return new Position(this.x-side * 2, side * 4 - 1, 'U'); // 6 U -> 1 U
                    }
                } else if(this.y-1<100) {
                    if(this.x<50) {
                        return new Position(side, this.x + side, 'L'); // 2 U -> 4 R
                    }
                }
                return new Position(this.x, this.y-1, 'U');
            case 'L':
                if((this.x-1)<0) {
                    if(this.y<150) {
                        return new Position(side, side * 3 - this.y  - 1, 'R'); // 2 L -> 1/5 R
                    } else {
                        return new Position(this.y-side * 2, 0, 'D'); // 1 L -> 5 D
                    }
                } else {
                    if((this.x-1)<50) {
                        if(this.y<50) {
                            return new Position(0, side * 3- this.y - 1, 'R'); // 5 L -> 1/2 R
                        } else if(this.y<100) {
                            return new Position(this.y-side, side * 2, 'D'); // 4 L -> 2 D
                        }
                    }
                }
                return new Position(this.x-1, this.y, 'L');
            case 'D':
                if((this.y+1)>=200) {
                    return new Position(this.x+side * 2, 0, 'D'); // 1 D -> 6 D
                } else if((this.y+1)>=150) {
                    if((this.x)>=50) {
                        return new Position(side - 1, this.x+side * 2, 'L'); // 3 D -> 1 L
                    }
                } else if((this.y+1)>=50) {
                    if((this.x)>=100) {
                        return new Position(side * 2 - 1, this.x - side, 'L'); // 6 D -> 4 L
                    }
                }
                return new Position(this.x, this.y+1, 'D');
            case 'R':
                if((this.x+1)>=150) {
                    return new Position(side * 2 -1, side * 3-this.y - 1, 'L'); // 6 R -> 1/3 L
                } else if((this.x+1)>=100) {
                    if(this.y>=100) {
                        return new Position(side * 3 - 1, side * 3-this.y - 1, 'L'); // 3 R -> 1/6 L
                    } else if(this.y>=50) {
                        return new Position(this.y+side, side -1, 'U'); // 4 R -> 6 U
                    }
                } else if((this.x+1)>=50) {
                    if(this.y>=150) {
                        return new Position(this.y - side * 2, side * 3 -1, 'U'); // 1 R -> 3 U
                    }
                }
                return new Position(this.x+1, this.y, 'R');
            default:
                return this;
        }
    }
    turnLeft() {
        switch (this.direction) {
            case 'U':
                this.direction = 'L';
                break;
            case 'L':
                this.direction = 'D';
                break;
            case 'D':
                this.direction = 'R';
                break;
            case 'R':
                this.direction = 'U';
                break;
        }
    }

    turnRight() {
        switch (this.direction) {
            case 'U':
                this.direction = 'R';
                break;
            case 'R':
                this.direction = 'D';
                break;
            case 'D':
                this.direction = 'L';
                break;
            case 'L':
                this.direction = 'U';
                break;
        }

    }

    finalPassword() {
        return (this.y+1) * 1000 + (this.x+1) * 4 + this.facingValue();
    }

    facingValue() {
        switch (this.direction) {
            case 'U':
                return 3;
            case 'L':
                return 2;
            case 'D':
                return 1;
            case 'R':
                return 0;
            default:
                return 0;
        }
    }
}