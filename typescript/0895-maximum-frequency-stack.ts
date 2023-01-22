class FreqStack {
    cnt: Map<number, number>;
    maxCnt: number;
    stacks: Map<number, number[]>;
    constructor() {
        this.cnt = new Map();
        this.maxCnt = 0;
        this.stacks = new Map();
    }

    push(val: number): void {
        let valCnt: number = 1 + (this.cnt.get(val) || 0);
        this.cnt.set(val, valCnt);

        if (valCnt > this.maxCnt) {
            this.maxCnt = valCnt;
            this.stacks.set(valCnt, []);
        }
        this.stacks.get(valCnt)?.push(val);
    }

    pop(): number {
        let res: number = this.stacks.get(this.maxCnt)?.pop()!;
        this.cnt.set(res, this.cnt.get(res)! - 1);

        if (this.stacks.get(this.maxCnt)?.length == 0) {
            this.maxCnt -= 1;
        }

        return res;
    }
}
