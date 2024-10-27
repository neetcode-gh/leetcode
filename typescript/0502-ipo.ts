function findMaximizedCapital(k: number, w: number, profits: number[], capital: number[]): number {
    const minCapital = new PriorityQueue({ compare: (a, b) => a[1] - b[1] });
    const maxProfit = new MaxPriorityQueue();
    for (let i = 0; i < profits.length; i++) {
        minCapital.enqueue([profits[i], capital[i]]);
    }

    let profit = w;
    for (let i = 0; i < k; i++) {
        while (!minCapital.isEmpty() && minCapital.front()[1] <= profit) {
            const element = minCapital.dequeue();
            maxProfit.enqueue(element[0]);
        }

        if (maxProfit.isEmpty()) break;
        const { element } = maxProfit.dequeue();
        profit += element;
    }

    return profit;
};
