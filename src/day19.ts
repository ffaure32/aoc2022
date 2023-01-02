import "./extensions.ts";

class Blueprint {
    blueprintNumber: number;
    oreRobotCost: number;
    clayRobotCost: number;
    obsidianOreRobotCost: number;
    obsidianClayRobotCost: number;
    geodeOreRobotCost: number;
    geodeObsidianRobotCost: number;

    constructor(blueprintNumber: number,
                oreRobotCost: number,
                clayRobotCost: number,
                obsidianOreRobotCost: number, obsidianClayRobotCost: number,
                geodeOreRobotCost: number, geodeObsidianRobotCost: number) {
        this.blueprintNumber = blueprintNumber;
        this.oreRobotCost = oreRobotCost;
        this.clayRobotCost = clayRobotCost;
        this.obsidianOreRobotCost = obsidianOreRobotCost;
        this.obsidianClayRobotCost = obsidianClayRobotCost;
        this.geodeOreRobotCost = geodeOreRobotCost;
        this.geodeObsidianRobotCost = geodeObsidianRobotCost;
    }

}

export class BuilderMap {
    remainingTime: number;
    blueprint: Blueprint;
    keeps: number;
    part2: boolean;
    constructor(blueprint: Blueprint, remainingTime = 24, keeps = 5000, part2 = false) {
        this.remainingTime = remainingTime;
        this.blueprint = blueprint;
        this.keeps = keeps;
        this.part2 = part2;
    }

    buildLoop() {
        let builders = new Array<Builder>();
        builders.push(new Builder(this.blueprint));
        while (this.remainingTime > 0) {
            const newBuilders = new Array<Builder>();
            for (const builder of builders) {
                newBuilders.push(builder);
                if (builder.canBuildOreRobot()) {
                    const newBuilder = builder.clone();
                    newBuilder.startBuildingOreRobot();
                    newBuilder.builds.push(`Add ore robot at ${this.remainingTime}`)
                    newBuilders.push(newBuilder);
                }
                if (builder.canBuildClayRobot()) {
                    const newBuilder = builder.clone();
                    newBuilder.startBuildingClayRobot();
                    newBuilder.builds.push(`Add clay robot at ${this.remainingTime}`)
                    newBuilders.push(newBuilder);
                }
                if (builder.canBuildObsidianRobot()) {
                    const newBuilder = builder.clone();
                    newBuilder.startBuildingObsidianRobot();
                    newBuilder.builds.push(`Add obsidian robot at ${this.remainingTime}`);
                    newBuilders.push(newBuilder);
                }
                if (builder.canBuildGeodeRobot()) {
                    const newBuilder = builder.clone();
                    newBuilder.startBuildingGeodeRobot();
                    newBuilder.builds.push(`Add geode robot at ${this.remainingTime}`);
                    newBuilders.push(newBuilder);
                }
            }
            for (const newBuilder of newBuilders) {
                newBuilder.collect();
                newBuilder.endBuildings();
            }
            // console.log(builders.length);
            builders = this.keepBestProducers(newBuilders);
            // console.log(builders[0]);
            this.remainingTime--;
        }
        return builders.map(p => p.geode).max();
    }


    private keepBestProducers(builders: Array<Builder>) {
        return builders.sort((a, b) => a.compare(b, this.part2)).slice(0, this.keeps);
    }

}

export class Builder {
    blueprint: Blueprint;
    ore: number;
    oreRobot: number;
    clay: number;
    clayRobot: number;
    obsidian: number;
    obsidianRobot: number;
    geode: number;
    geodeRobot: number;
    builds: Array<string>;
    buildingOreRobot: boolean;
    buildingClayRobot: boolean;
    buildingObsidianRobot: boolean;
    buildingGeodeRobot: boolean;

    constructor(blueprint: Blueprint) {
        this.blueprint = blueprint;
        this.ore = 0;
        this.oreRobot = 1;
        this.clay = 0;
        this.clayRobot = 0;
        this.obsidian = 0;
        this.obsidianRobot = 0;
        this.geode = 0;
        this.geodeRobot = 0;
        this.builds = new Array<string>();
        this.buildingOreRobot = false;
        this.buildingClayRobot = false;
        this.buildingObsidianRobot = false;
        this.buildingGeodeRobot = false;
    }

    compare(other: Builder, part2: boolean) {
        if(part2) {
            return (other.geodeRobot - this.geodeRobot) * 100000
                + (other.obsidianRobot - this.obsidianRobot) * 1000
                + (other.clayRobot - this.clayRobot) * 100
                + (other.ore - this.ore) * 1
        } else {
            return (other.geodeRobot - this.geodeRobot) * 100000
                + (other.obsidian - this.obsidian) * 1000
                + (other.clay - this.clay) * 100
                + (other.ore - this.ore) * 1
        }
    }

    collect() {
        this.ore += this.oreRobot;
        this.clay += this.clayRobot;
        this.obsidian += this.obsidianRobot;
        this.geode += this.geodeRobot;
    }

    canBuildOreRobot() {
        return this.ore >= this.blueprint.oreRobotCost;
    }

    startBuildingOreRobot() {
        this.ore -= this.blueprint.oreRobotCost;
        this.buildingOreRobot = true;
    }

    endBuildingOreRobot() {
        if (this.buildingOreRobot) {
            this.oreRobot += 1;
            this.buildingOreRobot = false;
        }
    }

    canBuildClayRobot() {
        return this.ore >= this.blueprint.clayRobotCost;
    }

    startBuildingClayRobot() {
        this.ore -= this.blueprint.clayRobotCost;
        this.buildingClayRobot = true;
    }

    endBuildingClayRobot() {
        if (this.buildingClayRobot) {
            this.clayRobot += 1;
            this.buildingClayRobot = false;
        }
    }

    canBuildObsidianRobot() {
        return this.ore >= this.blueprint.obsidianOreRobotCost && this.clay >= this.blueprint.obsidianClayRobotCost;
    }

    startBuildingObsidianRobot() {
        this.ore -= this.blueprint.obsidianOreRobotCost;
        this.clay -= this.blueprint.obsidianClayRobotCost;
        this.buildingObsidianRobot = true;
    }

    endBuildingObsidianRobot() {
        if (this.buildingObsidianRobot) {
            this.obsidianRobot += 1;
            this.buildingObsidianRobot = false;
        }
    }

    canBuildGeodeRobot() {
        return this.ore >= this.blueprint.geodeOreRobotCost && this.obsidian >= this.blueprint.geodeObsidianRobotCost;
    }

    startBuildingGeodeRobot() {
        this.ore -= this.blueprint.geodeOreRobotCost;
        this.obsidian -= this.blueprint.geodeObsidianRobotCost;
        this.buildingGeodeRobot = true;
    }

    endBuildingGeodeRobot() {
        if (this.buildingGeodeRobot) {
            this.geodeRobot += 1;
            this.buildingGeodeRobot = false;
        }
    }

    endBuildings() {
        this.endBuildingOreRobot();
        this.endBuildingClayRobot();
        this.endBuildingObsidianRobot();
        this.endBuildingGeodeRobot();
    }

    clone() {
        let clone = new Builder(this.blueprint);
        clone.ore = this.ore;
        clone.oreRobot = this.oreRobot;
        clone.clay = this.clay;
        clone.clayRobot = this.clayRobot;
        clone.obsidian = this.obsidian;
        clone.obsidianRobot = this.obsidianRobot;
        clone.geode = this.geode;
        clone.geodeRobot = this.geodeRobot;
        clone.builds = new Array<string>(...this.builds);
        return clone;
    }
}

export function parseInput(lines: string[]) {
    return lines.map(l => parseLine(l));
}

export function parseLine(line: string) {
    const column = line.split(':');
    const blueprintNumber = Number(column[0].split(' ')[1]);
    const costs = column[1].split('.');
    const first = costs[0].split(' ');
    const oreCost = Number(first[first.length - 2]);
    const second = costs[1].split(' ');
    const clayRobotCost = Number(second[second.length - 2]);
    const third = costs[2].split(' ');
    const obsidianOreRobotCost = Number(third[third.length - 5]);
    const obsidianClayRobotCost = Number(third[third.length - 2]);
    const forth = costs[3].split(' ');
    const geodeOreRobotCost = Number(forth[forth.length - 5]);
    const geodeObsidianRobotCost = Number(forth[forth.length - 2]);

    return new Blueprint(blueprintNumber, oreCost, clayRobotCost, obsidianOreRobotCost, obsidianClayRobotCost, geodeOreRobotCost, geodeObsidianRobotCost);
}