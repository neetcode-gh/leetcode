/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function (num1, num2) {
    if (num1 === '0' || num2 === '0') {
        return '0';
    }

    var res = new Array(num1.length + num2.length).fill(0);
    var revNum1 = [...num1].reverse();
    var revNum2 = [...num2].reverse();

    for (var i1 in revNum1) {
        for (var i2 in revNum2) {
            var digit = revNum1[i1] * revNum2[i2];
            var index = Number(i1) + Number(i2);
            res[index] += digit;
            res[index + 1] += Math.floor(res[index] / 10);
            res[index] = res[index] % 10;
        }
    }

    if (res[res.length - 1] === 0) {
        res.pop();
    }

    return res.reverse().join('');
};
