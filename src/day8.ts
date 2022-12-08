import "./extensions.ts";

class TreeMap {
    treeRows: number[][];
    treeCols: number[][];

    constructor(treeRows: number[][], treeCols: number[][]) {
        this.treeRows = treeRows;
        this.treeCols = treeCols;
    }

    maxSight() {
        let maxSight = 0;
        for (let i = 1; i < this.treeRows.length-1; i++) {
            for (let j = 1; j <this.treeCols.length-1; j++) {
                let scenicScore = this.scenicScore(i, j);
                if(scenicScore>maxSight) {
                    maxSight = scenicScore;
                }
            }
        }
        return maxSight;
    }

    countVisible() {
        let visibleCount = 0;
        for (let i = 0; i < this.treeRows.length; i++) {
            for (let j = 0; j <this.treeCols.length; j++) {
                if(this.isVisible(i, j)) {
                    visibleCount++;
                }
            }
        }
        return visibleCount;
    }
    isVisible(row: number, col: number) {
        return this.isLineVisible(this.treeRows[row], col) || this.isLineVisible(this.treeCols[col], row);
    }

    isLineVisible(line: number[], index: number) {
        if(index == 0 || index == line.length-1) {
            return true;
        }
        let number = line[index];
        const start = line.slice(0, index);
        const end = line.slice(index+1);

        return number>this.max(start) || number>this.max(end)
    }

    scenicScore(row: number, col: number) {
        return this.lineScenicScore(this.treeRows[row], col) * this.lineScenicScore(this.treeCols[col], row);
    }

    lineScenicScore(line: number[], index: number) : number {
        let number = line[index];
        const start = line.slice(0, index).reverse();
        let leftSight = this.computeSightForSide(start, number);
        const end = line.slice(index+1);
        let rightSight = this.computeSightForSide(end, number);
        return leftSight * rightSight;
    }

    private computeSightForSide(start: number[], number: number) {
        let leftSight = 1;
        for (let i = 0; i < start.length - 1; i++) {
            if (start[i] >= number) {
                break;
            } else {
                leftSight++;
            }
        }
        return leftSight;
    }

    private max(start: number[]) {
        return Math.max(...start);
    }
}

export function parseInput(lines: Array<string>) : TreeMap {
    const treeRows = lines
        .map((l) => l.split('').map(letter => Number(letter)));
    const treeCols = new Array<Array<number>>();
    for (let i = 0; i < lines.length; i++) {
        treeCols[i] = new Array<number>();
        for (let j = 0; j < lines.length; j++) {
            treeCols[i].push(treeRows[j][i]);
        }
    }
    return new TreeMap(treeRows, treeCols);
}

export function computePartOne(lines: Array<string>): number {
    const treeMap = parseInput(lines)
    return treeMap.countVisible();
}

export function computePartTwo(lines: Array<string>): number {
    const treeMap = parseInput(lines)
    return treeMap.maxSight();
}
