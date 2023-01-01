function calPoints(operations: string[]): number {
    const stack: number[] = [];

    for (const op of operations) {
        if (op === '+') {
            stack.push(stack[stack.length - 1] + stack[stack.length - 2]);
        } else if (op === 'D') {
            stack.push(stack[stack.length - 1] * 2);
        } else if (op === 'C') {
            stack.pop();
        } else {
            stack.push(Number(op));
        }
    }

    let res = 0;

    for (const num of stack) {
        res += num;
    }

    return res;
}
