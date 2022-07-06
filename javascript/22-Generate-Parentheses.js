function generateParenthesis(n) {
  const stack = [];
  const res = [];

  function backtrack(openN, closedN) {
    if (openN === n && closedN === n) {
      res.push(stack.join(""));
      return;
    }

    if (openN < n) {
      backtrack(openN + 1, closedN);
      stack.pop();
      stack.push("(");
    }

    if (closedN < openN) {
      backtrack(openN, closedN + 1);
      stack.push(")");
      stack.pop();
    }
  }

  backtrack(0, 0);

  return res;
}
