export type operationFn = (level: bigint) => bigint;

export class Monkey {
    itemList: Array<bigint>;
    recepientOnTrue: number;
    recepientOnFalse: number;
    operation: operationFn;
    relief: operationFn;
    divider: bigint;
    destinations: Array<[number, bigint]>;
    inspectedItemsCount: number;

    constructor(itemList: Array<bigint>, operation: operationFn, relief: operationFn,
                divider: bigint, recepientOnTrue: number, recepientOnFalse: number) {
        this.itemList = itemList;
        this.operation = operation;
        this.relief = relief;
        this.divider = divider;
        this.recepientOnTrue = recepientOnTrue;
        this.recepientOnFalse = recepientOnFalse;
        this.destinations = new Array<[number, bigint]>();
        this.inspectedItemsCount = 0;
    }

    inspectItem(index: number) {
        const level = this.itemList[index];
        let updatedLevel = this.operation(level);
        updatedLevel = this.relief(updatedLevel);
        let divisible = updatedLevel % this.divider === 0n;
        const recipient = divisible ? this.recepientOnTrue : this.recepientOnFalse;

        this.destinations.push([recipient, updatedLevel]);
    }

    inspectItems() {
        this.inspectedItemsCount += this.itemList.length;
        this.destinations = new Array<[number, bigint]>();
        for (let i = 0; i < this.itemList.length; i++) {
            this.inspectItem(i);
        }
        this.itemList = new Array<bigint>();
        return this.destinations;
    }

    newItem(level: bigint) {
        this.itemList.push(level);
    }
}

export function computeMonkeyBusiness(monkeyList: Array<Monkey>, rounds: bigint) {
    let previous = [0,0,0,0,0,0,0,0];
    for (let i = 0; i < rounds; i++) {
        for (let monkey of monkeyList) {
            const destinations = monkey.inspectItems();
            for(const destination of destinations) {
                monkeyList[destination[0]].newItem(destination[1]);
            }
        }
        previous = monkeyList.map((m) => m.inspectedItemsCount);
    }
    const sortedCounts = monkeyList.map((m) => m.inspectedItemsCount).sort((a, b) => (b-a));
    return sortedCounts[0]*sortedCounts[1];
}
