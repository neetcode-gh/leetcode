/** @const {!Object} */
const OPERATORS = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => Math.trunc(a / b)
};

/**
 * @param {string[]} tokens
 * @return {number}
 */
function evalRPN(tokens) {
    const stack = [];
    for (const token of tokens) {
        if (token in OPERATORS) {
            const rhs = stack.pop();
            const lhs = stack.pop();
            stack.push(OPERATORS[token](lhs, rhs));
        } else {
            stack.push(Number(token));
        }
    }
    return stack.pop();
}
