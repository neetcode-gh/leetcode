/**
 * https://leetcode.com/problems/daily-temperatures
 * Time O(N) | Space O(N)
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function(temperatures, stack = []) {
    const days = Array(temperatures.length).fill(0);

    for (let day = 0; day < temperatures.length; day++) {/* Time O(N + N) */
        while (canShrink(stack, temperatures, day)) {    /* Time O(N + N) */
            const prevColdDay = stack.pop();
            const daysToWait = (day - prevColdDay);

            days[prevColdDay] = daysToWait;              /* Ignore Space O(N) */
        }

        stack.push(day);                                 /* Space O(N) */
    }

    return days;
};

const canShrink = (stack, temperatures, day) => {
    const previousDay = stack[stack.length - 1];
    const [ prevTemperature, currTemperature ] = [ temperatures[previousDay], temperatures[day] ];
    const isWarmer = prevTemperature < currTemperature;

    return stack.length && isWarmer;
}

/**
 * https://leetcode.com/problems/daily-temperatures
 * Time O(N) | Space O(1)
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function(temperatures, hottest = 0) {
    const days = new Array(temperatures.length).fill(0);

    for (let day = (temperatures.length - 1); (0 <= day); day--) {/* Time O(N + N) */
        const temperature = temperatures[day];

        const isHotter = hottest <= temperature
        if (isHotter) {
            hottest = temperature;
            continue;                                             /* Time O(N + N) */
        }

        search(temperatures, day, temperature, days);             /* Time O(N + N) | Ignore Space O(N) */
    }

    return days;
}

const search = (temperatures, day, temperature, days, dayCount = 1) => {
    const isHotter = () => temperatures[day + dayCount] <= temperature;
    while (isHotter()) dayCount += days[day + dayCount];          /* Time O(N + N) */

    days[day] = dayCount;                                         /* Ignore Space O(N) */
}