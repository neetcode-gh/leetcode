function dailyTemperatures(temperatures: number[]): number[] {
    let stack = [];

    let result = new Array(temperatures.length).fill(0);

    for (let i = 0; i < temperatures.length; i++) {
        let currTemp = temperatures[i];

        while (stack.length > 0 && currTemp > stack[stack.length - 1].temp) {
            let { ind } = stack.pop();
            result[ind] = i - ind;
        }

        stack.push({ temp: currTemp, ind: i });
    }

    return result;
}
