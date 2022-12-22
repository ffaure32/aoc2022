export class Node {
    value: number;
    previous: Node | undefined;
    next: Node | undefined;

    constructor(value: number) {
        this.value = value;
        this.previous = undefined;
        this.next = undefined;
    }
}

export class EncryptedFile {
    originalList: number[];
    nodeList: Node[];

    constructor(lines: string[], decryptionKey: number = 1) {
        this.originalList = lines.map(l => Number(l)*decryptionKey);
        this.nodeList = this.originalList.map(n => new Node(n));
        for (let i = 0; i < this.originalList.length; i++) {
            const node = this.nodeList[i];
            node.previous = this.nodeList[i-1] ?? this.nodeList[this.nodeList.length-1];
            node.next = this.nodeList[i+1] ?? this.nodeList[0];
        }
    }

    allMoves() {
        for (let i = 0; i < this.originalList.length; i++) {
            this.move(i);
        }
    }
    allMovesTimes(times: number) {
        for (let i = 0; i < times; i++) {
            this.allMoves();
        }
    }

    move(i: number) {
        const value = this.originalList[i];
        let currentNode = this.nodeList[i];
        let node = currentNode;

        if (value > 0) {
            for (let j = 0; j < value%(this.originalList.length-1); j++) {
                node = node.next!;
            }
            this.withdrawCurrentNode(currentNode);
            this.insert(node, currentNode);
        } else if (value < 0) {
            for (let j = 0; j <= Math.abs(value)%(this.originalList.length-1); j++) {
                node = node.previous!;
            }
            this.withdrawCurrentNode(currentNode);
            this.insert(node, currentNode);
        }
    }

    private withdrawCurrentNode(currentNode: Node) {
        currentNode.previous!.next = currentNode.next!;
        currentNode.next!.previous = currentNode.previous!;
    }

    private insert(targetNode: Node, nodeToInsert: Node) {
        const next = targetNode.next!;
        targetNode.next = nodeToInsert;
        nodeToInsert.previous = targetNode;
        nodeToInsert.next = next;
        next.previous = nodeToInsert;
    }


    modThousand(multiple: number) {
        const mod1000 = multiple % this.originalList.length;
        let node = this.nodeList[this.originalList.indexOf(0)];
        for (let i = 0; i < mod1000; i++) {
            node = node.next!;
        }
        return node.value;
    }

    groveCoordinates() {
        let mod1000 = this.modThousand(1000);
        let mod2000 = this.modThousand(2000);
        let mod3000 = this.modThousand(3000);
        return mod1000+ mod2000+ mod3000;
    }
}

export function parseInput(lines: string[], key:number=1) {
    return new EncryptedFile(lines, key);
}