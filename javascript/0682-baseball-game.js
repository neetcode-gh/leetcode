/**
 * @param {string[]} operations
 * @return {number}
 */
var calPoints = function(operations) {
    let runningSum = 0;
    const stack = [];
    for(const o of operations) {
        if(o === 'C') {
            runningSum -= stack.pop();
            continue;
        }
        if(o === 'D') {
            const val = stack[stack.length - 1] * 2;
            stack.push(val);
            runningSum += val;
            continue;
        }
        if(o === '+') {
            const val = stack[stack.length - 1] + stack[stack.length - 2];
            stack.push(val);
            runningSum += val;
            continue;
        }
        stack.push(+o);
        runningSum += +o;
    }
    return runningSum;
};
