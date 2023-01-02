class StockSpanner {
    stack: [number, number][];

    constructor() {
        this.stack = [];
    }

    next(price: number): number {
        let span = 1;
        while (
            this.stack.length &&
            this.stack[this.stack.length - 1][0] <= price
        ) {
            span += this.stack[this.stack.length - 1][1];
            this.stack.pop();
        }

        this.stack.push([price, span]);

        return span;
    }
}
