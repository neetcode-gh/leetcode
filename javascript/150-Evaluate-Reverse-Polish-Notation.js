/**
 * @param {string[]} tokens
 * @return {number}
 */
 var evalRPN = function(tokens) {
  let stack = [];
	for (const token of tokens) {
		if (/^[+\-*\/]$/.test(token)) {
      const rhs = stack.pop();
      const lhs = stack.pop();
      switch (token) {
        case '+':
          stack.push(lhs+rhs);
          break;
        case '-':
          stack.push(lhs-rhs);
          break;
        case '*':
          stack.push(lhs*rhs);
          break;
        case '/':
          stack.push(Math.trunc(lhs/rhs));
      };
    } else {
      stack.push(Number(token));
    };
	};
	return stack.pop();
};