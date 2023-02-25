class MyStack {
    q: number[];

    constructor() {
        this.q = [];
    }

    push(val: number) {
        this.q.push(val);
    }

    pop(): number {
        for (let i = 0; i < this.q.length - 1; i++) {
            this.q.push(this.q.shift()!);
        }
        return this.q.shift()!;
    }

    top(): number {
        return this.q[this.q.length - 1];
    }

    empty(): boolean {
        return this.q.length == 0;
    }
}
