import "./extensions.ts";

class TreeMap {
    treeRows: number[][];
    treeCols: number[][];

    constructor(treeRows: number[][], treeCols: number[][]) {
        this.treeRows = treeRows;
        this.treeCols = treeCols;
    }

    public countVisible() {
        let visibleCount = 0;
        for (let row = 0; row < this.treeRows.length; row++) {
            for (let col = 0; col <this.treeCols.length; col++) {
                if(this.isVisible(row, col)) {
                    visibleCount++;
                }
            }
        }
        return visibleCount;
    }
    private isVisible(row: number, col: number) {
        return this.isTreeVisibleInLine(this.treeRows[row], col) || this.isTreeVisibleInLine(this.treeCols[col], row);
    }

    private isTreeVisibleInLine(treeHeightsLine: number[], treeIndex: number) {
        if(treeIndex == 0 || treeIndex == treeHeightsLine.length-1) {
            return true;
        }
        let treeHeight = treeHeightsLine[treeIndex];
        const leftTrees = treeHeightsLine.slice(0, treeIndex);
        const rightTrees = treeHeightsLine.slice(treeIndex+1);

        return treeHeight > leftTrees.max() || treeHeight > rightTrees.max()
    }

    public maxSight() {
        let maxSight = 0;
        for (let row = 1; row < this.treeRows.length-1; row++) {
            for (let col = 1; col <this.treeCols.length-1; col++) {
                if(this.scenicScore(row, col) >maxSight) {
                    maxSight = this.scenicScore(row, col);
                }
            }
        }
        return maxSight;
    }

    private scenicScore(row: number, col: number) {
        let horizontalViewingDistance = this.viewingDistance(this.treeRows[row], col);
        let verticalViewingDistance = this.viewingDistance(this.treeCols[col], row);
        return horizontalViewingDistance * verticalViewingDistance;
    }

    private viewingDistance(treeHeightsLine: number[], treeIndex: number) : number {
        let treeHeight = treeHeightsLine[treeIndex];
        const leftTrees = treeHeightsLine.slice(0, treeIndex).reverse();
        let leftViewingDistance = this.viewingDistanceForSide(leftTrees, treeHeight);
        const rightTrees = treeHeightsLine.slice(treeIndex+1);
        let rightViewingDistance = this.viewingDistanceForSide(rightTrees, treeHeight);
        return leftViewingDistance * rightViewingDistance;
    }

    private viewingDistanceForSide(sideElements: number[], treeHeight: number) : number {
        let viewingDistance = 1;
        let index = 0;
        while (index < sideElements.length - 1 && sideElements[index] < treeHeight) {
            viewingDistance++;
            index++;
        }
        return viewingDistance;
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
