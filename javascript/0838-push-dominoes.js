/**
 * 838. Push Dominoes
 * -----------------------
 * link: https://leetcode.com/problems/push-dominoes/
 *
 * description: follow the rules of dominoes falling physics after one sec.
 *
 * time: O(n^2)
 * space: O(n)
 */

/**
 * @param {string} dominoes
 * @return {string}
 */
var pushDominoes = function (dominoes) {
    if (dominoes.length === 1) return dominoes;

    let dominoesArr = [...dominoes];

    for (let i = 0; i < dominoesArr.length; i++) {
        if (dominoesArr[i] !== '.') continue;

        let [left, right] = nearestMove(dominoesArr, i);

        if (left === -1 && right === -1) continue;

        if (left === -1 && dominoesArr[right] === 'L') {
            dominoesArr[i] = 'L';
        } else if (right === -1 && dominoesArr[left] === 'R') {
            dominoesArr[i] = 'R';
        } else if (i - left !== right - i) {
            if (i - left < right - i && dominoesArr[left] === 'R') {
                dominoesArr[i] = 'R';
                dominoesArr[right - 1] = dominoesArr[right];
            } else if (i - left > right - i && dominoesArr[right] === 'L') {
                dominoesArr[i] = 'L';
                dominoesArr[left + 1] = dominoesArr[left];
            } else if (dominoesArr[left] === dominoesArr[right]) {
                dominoesArr[i] = dominoesArr[right];
            }
        } else if (dominoesArr[left] === dominoesArr[right]) {
            dominoesArr[i] = dominoesArr[right];
        }
    }

    return dominoesArr.join('');
};

/**
 * @param {string[]} dominoes
 * @param {number} index
 * @returns {number[]}
 */
var nearestMove = function (dominoes, index) {
    let ans = [-1, -1];

    for (let i = index - 1; i > -1; i--) {
        if (ans[0] === -1 && (dominoes[i] === 'L' || dominoes[i] === 'R')) {
            ans[0] = i;
            break;
        }
    }

    for (let i = index + 1; i < dominoes.length; i++) {
        if (ans[1] === -1 && (dominoes[i] === 'L' || dominoes[i] === 'R')) {
            ans[1] = i;
            break;
        }
    }

    return ans;
};
