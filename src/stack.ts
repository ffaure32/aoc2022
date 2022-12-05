export class Stack {
    private _stack: Array<string>;
    private _count: number;

    constructor(values: Array<string>) {
        this._stack = new Array<string>();
        this._count = 0;
        this.pushAll(values);
    }

    get isEmpty(): boolean {
        return this.size === 0;
    }

    get size(): number {
        return this._count;
    }

    pushAll(values: Array<string>) {
        for (let i = 0; i < values.length; i++) {
            this.push(values[i]);
        }
    }

    push(value: string) {
        this._stack[this._count] = value;
        this._count++;
    }

    pop(): string {
        if (this.isEmpty) {
            return "";
        }
        this._count--;
        const value = this._stack[this._count];
        delete this._stack[this._count];
        return value;
    }

    peek(): string {
        if (this.isEmpty) {
            return "";
        }
        return this._stack[this._count - 1];
    }

    clear(): void {
        this._stack = new Array<string>();
        this._count = 0;
    }

    print(): string {
        if (this.isEmpty) {
            return '';
        }
        let values = [];
        for (let i = 0; i < this._count; i++) {
            values.unshift((this._stack[i] as any).toString());
        }
        return values.join(' -> ');
    }
}
