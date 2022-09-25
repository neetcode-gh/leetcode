/**
 * https://leetcode.com/problems/evaluate-reverse-polish-notation
 * Time O(N^2) | Space(1)
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function(tokens, index = 0) {
    while (1 < tokens.length) {/* Time O(N) */
        const isOperation = () => tokens[index] in OPERATORS;
        while (!isOperation()) index++;/* Time O(N) */

        const value = performOperation(tokens, index);

        tokens[index] = value;
        tokens.splice((index - 2), 2);/* Time O(N) */
        index--;
    }

    return tokens[0];
};

var OPERATORS = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => Math.trunc(a / b),
};

var performOperation = (tokens, index) => {
    const [ rightNum, leftNum ] = [ Number(tokens[index - 1]), Number(tokens[index - 2]) ]
    const operation = OPERATORS[tokens[index]];

    return operation(leftNum, rightNum);
}

/**
 * https://leetcode.com/problems/evaluate-reverse-polish-notation
 * Time O(N) | Space(N)
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function (tokens, stack = []) {
    for (const char of tokens) {/* Time O(N) */
        const isOperation = char in OPERATORS;
        if (isOperation) {
            const value = performOperation(char, stack);

            stack.push(value);      /* Space O(N) */

            continue;
        }

        stack.push(Number(char));   /* Space O(N) */
    }

    return stack.pop();
}

var OPERATORS = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => Math.trunc(a / b)
};

var performOperation = (char, stack) => {
    const [ rightNum, leftNum ] = [ stack.pop(), stack.pop() ];
    const operation = OPERATORS[char];

    return operation(leftNum, rightNum);
}