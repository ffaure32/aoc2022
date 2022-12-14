export class Waterfall {
    map : Map<number, Map<number, string>>;
    bottomy: number;
    sandCount: number;
    flowing: boolean;
    bottomWall: boolean;

    constructor() {
        this.map = new Map<number, Map<number, string>>();
        this.bottomy = 0;
        this.sandCount = 0;
        this.flowing = true;
        this.bottomWall = false;
    }

    addLine(line: string) {
        const segments = line.split(' -> ');
        for (let i = 0; i < segments.length-1; i++) {
            const start = coords(segments[i]);
            const end = coords(segments[i+1]);
            const minx = Math.min(start[0], end[0]);
            const maxx = Math.max(start[0], end[0]);
            const miny = Math.min(start[1], end[1]);
            const maxy = Math.max(start[1], end[1]);
            for (let y = miny; y <= maxy; y++) {
                for (let x = minx; x <= maxx; x++) {
                    this.addChar(x, y, '#');
                }
            }
            this.bottomy = Math.max(maxy, this.bottomy);
        }
    }

    addChar(x: number, y: number, value: string) {
        this.getOrCreateHorizontalLine(y).set(x, value);
    }

    getOrCreateHorizontalLine(y: number) {
        let mapx = this.map.get(y);
        if(!mapx) {
            mapx = new Map<number, string>();
            this.map.set(y, mapx);
        }
        return mapx;
    }

    pourAllSand() {
        while (this.flowing) {
            this.pourSand();
        }
    }

    pourSand() {
        let x = 500;
        let rest = false;
        let upTouched = false;
        for (let y = 0; y <= this.bottomy; y++) {
            const horizontalLine = this.getOrCreateHorizontalLine(y);
            if(!horizontalLine.has(x)) {
                // x does not change
            } else if(!horizontalLine.has(x-1)) {
                x = x-1;
            } else if(!horizontalLine.has(x+1)) {
                x = x+1;
            } else {
                this.addChar(x, y-1, 'o');
                rest = true;
                upTouched = (y-1 === 0);
                break;
            }
        }
        if(this.bottomWall) {
            if (!rest) {
                this.addChar(x, this.bottomy-1, 'o');
            }
            this.sandCount++;
            if(upTouched) {
                this.flowing = false;
            }
        } else {
            if(rest) {
                this.sandCount++;
            } else {
                this.flowing = false;
            }
        }
    }

    buildBottom() {
        this.bottomy+=2;
        this.bottomWall = true;
    }
}



function coords(point: string) {
    const split = point.split(',');
    return [Number(split[0]), Number(split[1])];
}