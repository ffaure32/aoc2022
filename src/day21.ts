export abstract class AbstractMonkey {
    monkeys: Map<string, AbstractMonkey>;
    name: string;

    constructor(name: string, monkeys: Map<string, AbstractMonkey>) {
        this.name = name;
        this.monkeys = monkeys;
    }

    abstract yell() : number;

    getMonkey(name: string) {
        return this.monkeys.get(name)!;
    }
}


export class Monkey extends AbstractMonkey {
    yellNumber: number;

    constructor(name: string, monkeys: Map<string, AbstractMonkey>, yellNumber: number) {
        super(name, monkeys);
        this.yellNumber = yellNumber;
    }

    yell(): number {
        return this.yellNumber;
    }
}

export class OperationMonkey extends AbstractMonkey {
    leftOperand: string;
    rightOperand: string;
    operation: string;

    constructor(name: string, monkeys: Map<string, AbstractMonkey>, leftOperand: string, rightOperand: string, operation: string) {
        super(name, monkeys);
        this.leftOperand = leftOperand;
        this.rightOperand = rightOperand;
        this.operation = operation;
    }

    revert(parentValue: number, child: string): number {
        if(child === this.leftOperand) {
            let otherValue = this.getMonkey(this.rightOperand).yell();
            switch (this.operation) {
                case '+':
                    return parentValue - otherValue;
                case '*':
                    return parentValue / otherValue;
                case '-':
                    return parentValue + otherValue;
                case '/':
                    return parentValue * otherValue;
            }
        } else {
            let otherValue = this.getMonkey(this.leftOperand).yell();
            switch (this.operation) {
                case '+':
                    return parentValue - otherValue;
                case '*':
                    return parentValue / otherValue;
                case '-':
                    return otherValue - parentValue;
                case '/':
                    return otherValue / parentValue;
            }

        }
        return 1;
    }
    yell(): number {
        let leftMonkey = this.getMonkey(this.leftOperand);
        let rightMonkey = this.getMonkey(this.rightOperand);
        return eval(leftMonkey.yell()+this.operation+rightMonkey.yell());
    }
}
export function parseInput(lines: string[]) {
    const monkeys = new Map<string, AbstractMonkey>();
    const parents = new Map<string, string>();
    lines.forEach(l => {
        const split = l.split(': ');
        const monkeyName = split[0];
        const monkeyYell = split[1];
        if (isNaN(Number(monkeyYell))) {
            const leftOperand = monkeyYell.slice(0, 4);
            const rightOperand = monkeyYell.slice(7);
            const operation = monkeyYell.charAt(5);
            monkeys.set(monkeyName, new OperationMonkey(monkeyName, monkeys, leftOperand, rightOperand, operation));
            parents.set(leftOperand, monkeyName);
            parents.set(rightOperand, monkeyName);
        } else {
            monkeys.set(monkeyName, new Monkey(monkeyName, monkeys, Number(monkeyYell)));
        }
    });
    return {monkeys, parents};
}

export function getMonkeyChain(lines: string[]) {
    const {monkeys, parents} = parseInput(lines);
    return buildMonkeyChainFromHuman(monkeys, parents);
}
const HUMAN = 'humn';
function buildMonkeyChainFromHuman(monkeys: Map<string, AbstractMonkey>, parents: Map<string, string>) {
    const familyTree = new Array<OperationMonkey>();
    let name = HUMAN;
    familyTree.push(<OperationMonkey>monkeys.get(name));
    while (name != 'root') {
        const parentName = parents.get(name)!;
        familyTree.push(<OperationMonkey>monkeys.get(parentName)!);
        name = parentName;
    }
    return familyTree.reverse();
}


function computeTargetYell(familyTree: OperationMonkey[]) {
    const root = familyTree[0];
    const target = root.leftOperand === familyTree[1].name ? root.getMonkey(root.rightOperand) : root.getMonkey(root.leftOperand);
    return target.yell();
}

export function computeOwnYell(familyTree: OperationMonkey[]) {
    let targetNumber = computeTargetYell(familyTree);
    for (let i = 1; i < familyTree.length - 1; i++) {
        targetNumber = familyTree[i].revert(targetNumber, familyTree[i + 1].name);
    }
    return targetNumber;
}