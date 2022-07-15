function dailyTemperatures(temperatures: number[]): number[] {
  const res = Array(temperatures.length).fill(0);
  const stack: [number, number][] = [];

  for (let i = 0; i < temperatures.length; i++) {
    const t = temperatures[i];
    while (stack.length && t > stack[stack.length - 1][0]) {
      const [stackT, stackIndex] = stack.pop()!;
      res[stackIndex] = i - stackIndex;
    }
    stack.push([t, i]);
  }

  return res;
}
