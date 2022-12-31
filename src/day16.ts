import "./extensions.ts";

export class Multipath {
    rate: number;
    opened: Set<string>
    paths: [Array<string>, Array<string>];
    constructor(rate: number, fullPath1: Array<string>, fullPath2: Array<string>, opened: Set<string>) {
        this.rate = rate;
        this.paths = [new Array<string>(...fullPath1), new Array<string>(...fullPath2)];
        this.opened = new Set<string>(opened);
    }
    last() {
        return [this.paths[0][this.paths[0].length-1],this.paths[1][this.paths[1].length-1]];
    }
    addValve(index: number, valveName: string) {
        this.paths[index].push(valveName);
    }

    addRate(valve : Valve, remainingTime: number) {
        this.rate+=valve.flowRate*(remainingTime);
        this.opened.add(valve.name);
    }

    clone() {
        return new Multipath(this.rate, this.paths[0], this.paths[1], this.opened);
    }
}

export class Path {
    rate: number;
    fullPath: Array<string>;
    opened: Set<string>
    constructor(first : string, rate: number, fullPath: Array<string>, opened: Set<string>) {
        this.rate = rate;
        this.fullPath = new Array<string>(...fullPath);
        this.fullPath.push(first);

        this.opened = new Set<string>(opened);
    }

    last() {
        return this.fullPath[this.fullPath.length-1];
    }

    addRate(valve: Valve, remainingTime: number) {
        this.rate += valve.flowRate * (remainingTime - 1);
        this.opened.add(valve.name);

    }

    clone(lastValveName: string) {
        return new Path(lastValveName, this.rate, this.fullPath, this.opened)
    }
}

export class Valve {
    name: string;
    flowRate: number;
    tunnels: Array<string>;
    opened: boolean;

    constructor(name: string, flowRate: number, tunnels: Array<string>) {
        this.name = name;
        this.flowRate = flowRate;
        this.tunnels = tunnels;
        this.opened = false;
    }

    open(day: number) {
        this.opened = true;
        return day * this.flowRate;
    }

    openable() {
        return this.flowRate > 0;
    }
}

class BiValves {
    valves : Map<string, Valve>;
    remainingTime: number;


    constructor(valvesArray : Array<Valve>) {
        this.valves = new Map<string, Valve>();
        valvesArray.forEach(v => this.valves.set(v.name, v));
        this.remainingTime = 26;
    }

    getMaxScore() {
        let paths = new Array<Multipath>();
        let rootPath = new Multipath( 0, new Array<string>(), new Array<string>(), new Set<string>());
        rootPath.addValve(0, 'AA');
        rootPath.addValve(1, 'AA');
        paths.push(rootPath);

        while (this.remainingTime>0) {
            const newpaths = new Array<Multipath>();
            for (const path of paths) {
                let currentValveNames = path.last();
                let currentValve = this.valves.get(currentValveNames[0])!;
                let elefantValve = this.valves.get(currentValveNames[1])!;

                if(currentValve.openable() && !path.opened.has(currentValve.name)) {
                    path.addRate(currentValve, this.remainingTime-1);
                    if(elefantValve.openable() && !path.opened.has(elefantValve.name)) {
                        path.addRate(elefantValve, this.remainingTime-1);
                        newpaths.push(path);
                    } else {
                        for (const next of elefantValve.tunnels) {
                            let newPath = path.clone();
                            newPath.addValve(1, next);
                            newpaths.push(newPath);
                        }
                    }
                } else {
                    for (const nextSelf of currentValve.tunnels) {
                        if(elefantValve.openable() && !path.opened.has(elefantValve.name)) {
                            let newPath = path.clone();
                            newPath.addRate(elefantValve, this.remainingTime-1);
                            newPath.addValve(0, nextSelf);
                            newpaths.push(newPath);
                        } else {
                            for (const nextElefant of elefantValve.tunnels) {
                                let newPath = path.clone();
                                newPath.addValve(0, nextSelf);
                                newPath.addValve(1, nextElefant);
                                newpaths.push(newPath);
                            }
                        }
                    }
                }
            }
            paths = this.keepLongestpaths(newpaths);
            this.remainingTime--;
        }
        return paths.map(p => p.rate).max();
    }

    private readonly MAX_NUMBER_OF_PATHS_TO_KEEP = 1000;

    private keepLongestpaths(pathsArray: Array<Multipath>) {
        return pathsArray.sort((a, b) => b.rate - a.rate).slice(0, this.MAX_NUMBER_OF_PATHS_TO_KEEP);
    }
}

class Valves {
    valves : Map<string, Valve>;
    remainingTime: number;


    constructor(valvesArray : Array<Valve>) {
        this.valves = new Map<string, Valve>();
        valvesArray.forEach(v => this.valves.set(v.name, v));
        this.remainingTime = 30;
    }

    getMaxScore() {
        let paths = new Array<Path>();
        paths.push(new Path('AA', 0, new Array<string>(), new Set<string>()));
        while (this.remainingTime>0) {
            const newpaths = new Array<Path>();
            for (const path of paths) {
                let currentValve = this.valves.get(path.last())!;
                if(currentValve.openable() && !path.opened.has(currentValve.name)) {
                    path.addRate(currentValve, this.remainingTime);
                    newpaths.push(path);
                } else {
                    for (const next of currentValve.tunnels) {
                        let newPath = path.clone(next);
                        newpaths.push(newPath);
                    }
                }
            }
            paths = this.keepLongestpaths(newpaths);
            this.remainingTime--;
        }
        return paths.map(p => p.rate).max();
    }

    private readonly MAX_NUMBER_OF_PATHS_TO_KEEP = 1000;

    private keepLongestpaths(pathsArray: Array<Path>) {
        return pathsArray.sort((a, b) => b.rate - a.rate).slice(0, this.MAX_NUMBER_OF_PATHS_TO_KEEP);
    }
}
export function parseLine(line: string) {
    const split = line.split(';');
    const name = split[0].slice(6, 8);
    const rate = Number(split[0].split('=')[1]);
    const tunnels = split[1].replace(" tunnels lead to valves ", "")
                            .replace(" tunnel leads to valve ", "")
                            .split(", ");
    return new Valve(name, rate, tunnels);
}

export function parseInput(lines: Array<string>) {
    const valvesArray = lines.map(l => parseLine(l));
    return new Valves(valvesArray);
}

export function parseInputPart2(lines: Array<string>) {
    const valvesArray = lines.map(l => parseLine(l));
    return new BiValves(valvesArray);
}