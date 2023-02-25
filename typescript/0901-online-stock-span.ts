class StockSpanner {
    private stack: { price: number; spanDays: number }[];

    constructor() {
        this.stack = [];
    }

    next(price: number): number {
        let span = 1;

        while (
            this.stack.length > 0 &&
            this.stack[this.stack.length - 1].price <= price
        ) {
            span += this.stack[this.stack.length - 1].spanDays;
            this.stack.pop();
        }

        this.stack.push({ price, spanDays: span });
        return span;
    }
}

/**
 * Your StockSpanner object will be instantiated and called as such:
 * var obj = new StockSpanner()
 * var param_1 = obj.next(price)
 */
