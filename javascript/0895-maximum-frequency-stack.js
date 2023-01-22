class FreqStack {
    constructor() {
        this.cnt = {};
        this.maxCnt = 0;
        this.stacks = {};
    }

    push(val) {
        let valCnt = 1 + (this.cnt[val] || 0);
        this.cnt[val] = valCnt;

        if (valCnt > this.maxCnt) {
            this.maxCnt = valCnt;
            this.stacks[valCnt] = [];
        }
        this.stacks[valCnt].push(val);
    }

    pop() {
        let res = this.stacks[this.maxCnt].pop();
        this.cnt[res] -= 1;

        if (this.stacks[this.maxCnt].length == 0) {
            this.maxCnt -= 1;
        }

        return res;
    }
}
