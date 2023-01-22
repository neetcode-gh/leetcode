function decodeString(s: string): string {
    let stack: string[] = [];

    for (let char of s) {
        if (char !== ']') {
            stack.push(char);
        } else {
            let substr: string = '';
            while (stack[stack.length - 1] !== '[') {
                substr = stack.pop() + substr;
            }
            stack.pop();

            let multiplier: string = '';
            while (
                stack.length !== 0 &&
                Number.isInteger(+stack[stack.length - 1])
            ) {
                multiplier = stack.pop() + multiplier;
            }

            stack.push(substr.repeat(+multiplier));
        }
    }
    return stack.join('');
}
