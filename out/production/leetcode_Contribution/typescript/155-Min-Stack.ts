class MinStack {
    stack: number[];
    minstack: number[];

    constructor() {
        this.stack = [];
        this.minstack = [];
    }

    push(val: number): void {
        this.stack.push(val);
        if (
            val < this.minstack[this.minstack.length - 1] ||
            this.minstack.length === 0
        ) {
            this.minstack.push(val);
        } else {
            this.minstack.push(this.minstack[this.minstack.length - 1]);
        }
    }

    pop(): void {
        this.stack.pop();
        this.minstack.pop();
    }

    top(): number {
        return this.stack[this.stack.length - 1];
    }

    getMin(): number {
        return this.minstack[this.minstack.length - 1];
    }
}

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */

const minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin();
minStack.pop();
minStack.top();
minStack.getMin();
