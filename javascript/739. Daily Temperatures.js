/**
 * @param {number[]} temperatures
 * @return {number[]}
 */

const dailyTemperatures = function(t) {
  const res = new Array(t.length).fill(0)
  const stack = []

  for (let i = t.length - 1; i >= 0; i--) {
    while (stack.length && t[i] >= stack[stack.length - 1].val) {
      stack.pop()
    }

    if (stack.length && t[i] < stack[stack.length - 1].val) {
      res[i] = stack[stack.length - 1].idx - i
    }

    stack.push({ idx: i, val: t[i] })
  }

  return res
}