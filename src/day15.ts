export function parseLine(line: string) {
    const sx = Number(line.slice(line.indexOf('x=')+2, line.indexOf(',')));
    const sy = Number(line.slice(line.indexOf('y=')+2, line.indexOf(':')));
    const bx = Number(line.slice(line.lastIndexOf('x=')+2, line.lastIndexOf(',')));
    const by = Number(line.slice(line.lastIndexOf('y=')+2));
    return new Sensor(sx, sy, bx, by);
}

export class Sensor {
    sensorX: number;
    sensorY: number;
    beaconX: number;
    beaconY: number;
    distance: number;

    constructor(sensorX: number, sensorY: number, beaconX: number, beaconY: number) {
        this.sensorX = sensorX;
        this.sensorY = sensorY;
        this.beaconX = beaconX;
        this.beaconY = beaconY;
        this.distance = Math.abs(this.sensorX-this.beaconX)+Math.abs(this.sensorY-this.beaconY);
    }

    noBeaconOnLine(line:number) : [number,number] {
        const distanceToLine = Math.abs(line-this.sensorY);

        if(distanceToLine<=this.distance) {
            const xDistance = Math.abs(this.distance-distanceToLine);
            return [this.sensorX-xDistance, this.sensorX+xDistance];
        }
        return [-1,-1];
    }
}

export function noBeaconsOnLine(sensors: Sensor[], line: number) {
    const merged = merge(sensors.map(s => s.noBeaconOnLine(line)));
    return merged[0][1]-merged[0][0];
}

function noBeaconsOnLineMax(sensors: Sensor[], line: number, min: number, max: number) {
    const intervals:Array<[number, number]> = sensors
            .map(s => s.noBeaconOnLine(line))
            .map(i => [Math.max(min, i[0]), Math.min(max, i[1])]);
    return merge(intervals);
}

export function distressSignal(sensors: Sensor[], min: number, max: number) {
    for (let y = min; y < max; y++) {
        let intervals = noBeaconsOnLineMax(sensors, y, min, max);
        if (intervals.length > 1) {
            const x = intervals[0][1] + 1;
            return x * 4000000 + y;
        }
    }
    return 1;
}
function merge(intervals: Array<[number, number]>) {
    if (intervals.length < 2) return intervals;

    intervals.sort((a, b) => a[0] - b[0]);

    const result = [];
    let previous = intervals[0];

    for (let i = 1; i < intervals.length; i += 1) {
        if (previous[1] >= intervals[i][0]-1) {
            previous = [previous[0], Math.max(previous[1], intervals[i][1])];
        } else {
            result.push(previous);
            previous = intervals[i];
        }
    }

    result.push(previous);

    return result;
}