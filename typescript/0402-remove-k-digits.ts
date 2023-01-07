function removeKdigits(num: string, k: number): string {
    let stack: string[] = [];
    for (let ch of num) {
        while (k > 0 && stack.length > 0 && stack[stack.length - 1] > ch) {
            k--;
            stack.pop();
        }
        stack.push(ch);
    }

    let x = 0;
    while (true) {
        if (stack[x] !== '0') {
            break;
        }
        x++;
    }
    stack = stack.slice(x, stack.length - k);
    let res = stack.join('');
    return res ? res : '0';
}
