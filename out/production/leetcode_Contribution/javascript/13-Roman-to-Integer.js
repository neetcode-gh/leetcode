/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
    let romans = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000,
    };

    let arr = s.split('');

    let sum = 0;

    for (let i = arr.length - 1; i >= 0; i--) {
        // IV : 4
        if (romans[arr[i]] === romans['V']) {
            if (romans[arr[i - 1]] === romans['I']) {
                sum -= 1 * 2;
            }
        }
        // IX : 4
        if (romans[arr[i]] === romans['X']) {
            if (romans[arr[i - 1]] === romans['I']) {
                sum -= 1 * 2;
            }
        }
        // XL : 40
        if (romans[arr[i]] === romans['L']) {
            if (romans[arr[i - 1]] === romans['X']) {
                sum -= 10 * 2;
            }
        }
        // XC : 90
        if (romans[arr[i]] === romans['C']) {
            if (romans[arr[i - 1]] === romans['X']) {
                sum -= 10 * 2;
            }
        }
        // CD : 400
        if (romans[arr[i]] === romans['D']) {
            if (romans[arr[i - 1]] === romans['C']) {
                sum -= 100 * 2;
            }
        }
        // CM : 900
        if (romans[arr[i]] === romans['M']) {
            if (romans[arr[i - 1]] === romans['C']) {
                sum -= 100 * 2;
            }
        }

        sum += romans[arr[i]];
    }

    return sum;
};

// Runtime: 148 ms, faster than 80.16% of JavaScript online submissions for Roman to Integer.
// Memory Usage: 47.5 MB, less than 18.15% of JavaScript online submissions for Roman to Integer.
