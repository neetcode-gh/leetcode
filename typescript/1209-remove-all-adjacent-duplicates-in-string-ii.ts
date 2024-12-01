function removeDuplicates(s: string, k: number): string {
    const stack: { char: string; count: number }[] = []; // [char, count];

    for (const c of s) {
        if (stack.length !== 0 && stack[stack.length - 1].char === c) {
            stack[stack.length - 1].count++;
        } else {
            stack.push({ char: c, count: 1 });
        }

        if (stack[stack.length - 1].count === k) {
            stack.pop();
        }
    }

    return stack.reduce(
        (acc, { char, count }) => (acc += char.repeat(count)),
        ''
    );
}
