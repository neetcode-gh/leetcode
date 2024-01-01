/**
 * @param {number} num
 * @return {number}
 */
var minimumSum = function (num) {
    let str = String(num).split("").sort(); // intialize str and split the num using String(), split() and sort()
    return parseInt(str[0] + str[2]) + parseInt(str[1] + str[3]); // return sum of 1st, 3rd and 2nd, 4th string digit and convert into num using parseInt  
};