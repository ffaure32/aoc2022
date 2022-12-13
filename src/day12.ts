class HeightMap {
    unseenSquare = '0';
    seenSquare = 'X';
    grid: string[][];
    seenGrid: string[][];
    startPosition: [number, number];
    endPosition: [number, number];

    constructor(grid: string[][]) {
        this.grid = grid;
        this.startPosition = [0, 0];
        this.endPosition = [0, 0];
        this.seenGrid = new Array<string[]>();
        for (let i = 0; i < this.grid.length; i++) {
            const line = new Array<string>();
            this.seenGrid.push(line);
            for (let j = 0; j <this.grid[0].length; j++) {
                line.push(this.unseenSquare);
                if(this.grid[i][j] === 'S') {
                    this.startPosition = [i, j];
                    this.grid[i][j] = 'a';
                }
                if(this.grid[i][j] === 'E') {
                    this.endPosition = [i, j];
                    this.grid[i][j] = 'z';
                }
            }
        }
    }

    findShortestPath() : number {
        const start = this.startPosition;
        let currentPositions = new Array<[number, number]>();
        let nextPositions = new Array<[number, number]>();
        currentPositions.push(start);
        let steps = 0;
        while(this.endPositionNotInCurrent(currentPositions)) {
            nextPositions = new Array<[number, number]>();
            for(const position of currentPositions) {
                nextPositions.push(...(this.accessibleNeighbours(position)));
            }
            currentPositions = nextPositions;
            steps++;
        }
        return steps;
    }

    findShortestFromEnd() : number {
        const start = this.endPosition;
        let currentPositions = new Array<[number, number]>();
        let nextPositions = new Array<[number, number]>();
        currentPositions.push(start);
        let steps = 0;
        while(this.aNotInCurrent(currentPositions)) {
            nextPositions = new Array<[number, number]>();
            for(const position of currentPositions) {
                nextPositions.push(...(this.accessibleNeighbours(position, false)));
            }
            currentPositions = nextPositions;
            steps++;
        }
        return steps;
    }

    private aNotInCurrent(currentPositions: [number, number][]) {
        return currentPositions.length > 0 && currentPositions.findIndex(p => this.grid[p[0]][p[1]]==='a') === -1;
    }

    private endPositionNotInCurrent(currentPositions: [number, number][]) {
        return currentPositions.length > 0 && currentPositions.findIndex(p => this.samePosition(p)) === -1;
    }

    private samePosition(p: [number, number]) {
        return p[0] == this.endPosition[0]
            && p[1] == this.endPosition[1];
    }

    accessibleNeighbours(position: [number, number], natural: boolean = true) {
        let x = position[0];
        let y = position[1];
        const letter = this.grid[x][y];
        const otherPositions = this.buildOtherPositions(x, y);
        const validPositions = new Array<[number, number]>();
        for(const position of otherPositions) {
            if(this.isAccessible(position, letter, natural)) {
                this.seenGrid[position[0]][position[1]] = this.seenSquare;
                validPositions.push(position);
            }
        }
        return validPositions;
    }

    private buildOtherPositions(x: number, y: number) {
        const otherPositions = new Array<[number, number]>();
        if (x > 0) {
            otherPositions.push([x-1, y]);
        }
        if (x < this.grid.length - 1) {
            otherPositions.push([x+1, y]);
        }
        if (y > 0) {
            otherPositions.push([x, y - 1]);
        }
        if (y < this.grid[0].length - 1) {
            otherPositions.push([x, y + 1]);
        }
        return otherPositions;
    }

    private isAccessible(neighbourCoords: number[], letter: string, natural: boolean) {
        const neighbour = this.grid[neighbourCoords[0]][neighbourCoords[1]];
        const seenNeighbour = this.seenGrid[neighbourCoords[0]][neighbourCoords[1]];
        return (seenNeighbour !== this.seenSquare
            && (natural ? neighbour.charCodeAt(0) - letter.charCodeAt(0) <= 1 : letter.charCodeAt(0) - neighbour.charCodeAt(0) <= 1));
    }
}

export function parseInput(lines: Array<string>) : HeightMap {
    const mapRows = lines
        .map(l => l.split(''));
    return new HeightMap(mapRows);
}
