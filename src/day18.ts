export class Droplet {
    coords: number[];

    constructor(line: string) {
        this.coords = line.split(',').map(n => Number(n));
    }

    faces() : Array<string> {
        const result = new Array<string>();
        result.push([this.coords[0]-1, this.coords[1], this.coords[2]].join(','));
        result.push([this.coords[0]+1, this.coords[1], this.coords[2]].join(','));
        result.push([this.coords[0], this.coords[1]-1, this.coords[2]].join(','));
        result.push([this.coords[0], this.coords[1]+1, this.coords[2]].join(','));
        result.push([this.coords[0], this.coords[1], this.coords[2]-1].join(','));
        result.push([this.coords[0], this.coords[1], this.coords[2]+1].join(','));
        return result;
    }



    stringify(): string {
        return this.coords.join(",");
    }
}

export function countVisibleFaces(lines: string[]) : number {
    const droplets = lines.map(l => new Droplet(l));
    const dropSet = new Set(lines);
    let count = 0;
    for(const droplet of droplets) {
        count += droplet.faces().filter(d => !dropSet.has(d)).length;
    }
    return count;
}

function range(droplets: Droplet[], axe: number) {
    let x = droplets.map(d => d.coords[axe]);
    return [Math.min(...x), Math.max(...x)];
}

function exposesFacesCount(droplets: Droplet[], dropSet: Set<string>): Map<string, number> {
    const facesCount = new Map<string, number>();
    const facesSet = new Set<string>();
    for (const droplet of droplets) {
        let unfiltered = droplet.faces().filter(d => !dropSet.has(d));
        for (const unfilteredLine of unfiltered) {
            let count = facesCount.get(unfilteredLine) || 0;
            facesCount.set(unfilteredLine, count + 1);
        }
        unfiltered.forEach(f => facesSet.add(f));
    }
    return facesCount;
}

export function countVisibleExternalFacesOld(lines: string[]) : number {
    const droplets = lines.map(l => new Droplet(l));

    const dropSet = new Set(lines);
    const facesCount = exposesFacesCount(droplets, dropSet);

    const rangeX = range(droplets, 0);
    const rangeY = range(droplets, 1);
    const rangeZ = range(droplets, 2);


    let count = 0;
    let visitedAreas = new Set<string>();
    let start = [rangeX[0], rangeY[0], rangeZ[0]].join(',');
    let min = Math.min(rangeX[0], rangeY[0], rangeZ[0]);
    let max = Math.max(rangeX[1], rangeY[1], rangeZ[1]);
    visitedAreas.add(start);
    let endLoop = false;
    while(!endLoop) {
        const newVisitedAreas = new Set<string>(visitedAreas);
        for(const block of visitedAreas) {
            const droplet = new Droplet(block);
            const faces = droplet.faces();
            faces
                .map(f => new Droplet(f))
                .filter(d => d.coords.every(c => c>=min-1 && c<=max+1))
                .map(d => d.stringify())
                .filter(s => !newVisitedAreas.has(s) && !dropSet.has(s))
                .forEach(s => {
                    count+=facesCount.get(s) || 0;
                    newVisitedAreas.add(s);
                });
        }
        if(newVisitedAreas.size === visitedAreas.size) {
            endLoop = true;
        }
        visitedAreas = newVisitedAreas;
    }

    return count;
}