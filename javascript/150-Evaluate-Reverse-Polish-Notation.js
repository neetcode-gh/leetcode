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

/*Solution-2*/

// let evalRPN = (tokens) => {
//     const stack = [];
//     for(let token of tokens){
//         if(token === '+' || token === '-' || token === '/' || token === '*'){
//             const operand2 = stack.pop();
//             const operand1 = stack.pop();
//             switch(token){
//                 case '+':
//                     stack.push(operand1+operand2);
//                     continue;
//                 case '-':
//                     stack.push(operand1-operand2);
//                     continue;
//                 case '*':
//                     stack.push(operand1*operand2);
//                     continue;
//                 case '/':
//                     stack.push(Math.trunc(operand1/operand2));
//                     continue;
//             }
//         }
//         else{
//             stack.push(parseInt(token));
//         }
//     }
//     return(stack[0])
// }
