/**
 * @param {string} s
 * @return {string[]}
 */
var findRepeatedDnaSequences = function (s) {
    const seen = new Set();
    const res = new Set();
    const arr = Array.from(s);

    for (let l = 0; l < arr.length - 9; l++) {
        const sequence = s.slice(l, l + 10);

        if (seen.has(sequence)) {
            res.add(sequence);
        } else {
            seen.add(sequence);
        }
    }

    return Array.from(res);
};