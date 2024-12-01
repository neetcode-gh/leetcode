/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function (s) {
    let res = [];

    if (s.length > 12) return res;

    /**
     *
     * @param {number} i
     * @param {number} dots
     * @param {string} currentIP
     */
    function backtracking(i, dots, currentIP) {
        if (dots === 4 && i == s.length) {
            res.push(currentIP.slice(0, currentIP.length - 1));
            return;
        } else if (dots > 4) {
            return;
        }

        for (let j = i; j < Math.min(i + 3, s.length); j++) {
            if (+s.slice(i, j + 1) < 256 && (i == j || s[i] != '0')) {
                backtracking(
                    j + 1,
                    dots + 1,
                    currentIP + s.slice(i, j + 1) + '.'
                );
            }
        }
    }

    backtracking(0, 0, '');

    return res;
};
