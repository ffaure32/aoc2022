export class Register {
    cycle: number;
    cycleScore: Map<number, number>;
    currentScore: number;
    pixelPosition: number;
    drawingLine: string;
    drawingLines: string[];
    constructor() {
        this.pixelPosition = 0;
        this.cycle = 0;
        this.cycleScore = new Map<number, number>();
        this.currentScore = 1;
        this.drawingLine = "";
        this.drawingLines = new Array<string>();
    }

    nextCycle(line : String) {
        this.drawPixel();
        this.cycle++;
        this.cycleScore.set(this.cycle, this.currentScore);
        if (line !== 'noop') {
            this.drawPixel();
            this.currentScore += Number(line.slice(5));
            this.cycle++;
            this.cycleScore.set(this.cycle, this.currentScore);
        }
    }

    drawPixel() {
        if(this.currentScore-1<=this.pixelPosition && this.pixelPosition<=this.currentScore+1) {
            this.drawingLine += "#";
        } else {
            this.drawingLine += ".";
        }
        this.pixelPosition++;
        if(this.cycle % 40 === 39) {
            this.drawingLines.push(this.drawingLine);
            this.drawingLine = "";
            this.pixelPosition = 0;
        }
    }
    signalStrength(index: number) {
        return (this.cycleScore.get(index-1) || 1)*index;
    }

    totalStrength(indexes: number[]) {
        let total = 0;
        for (const item of indexes) {
            total += this.signalStrength(item);
        }
        return total;
    }
}

export function parseInput(lines: string[]):Register {
    const register = new Register();
    for (const item of lines) {
        register.nextCycle(item);
    }
    console.log(register.drawingLines);
    return register;
}
