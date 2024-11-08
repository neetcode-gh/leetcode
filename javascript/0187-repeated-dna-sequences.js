/**
 * https://leetcode.com/problems/repeated-dna-sequences/
 * Hashing
 * s = the number of letters in the sequence. In our case, it's 10. so the time complexity would be 10*n which boils down to n.
 * Time O(n) | Space O(n)
 * @param {string} s
 * @return {string[]}
 */
var findRepeatedDnaSequences = function (s) {
    const sequenceSet = new Set();
    let resultSet = new Set();

    for (let i = 0; i < s.length; i++) {
        const subSequence = getSubSequence(s, i, 10);
        if (sequenceSet.has(subSequence)) {
            resultSet.add(subSequence);
        } else {
            sequenceSet.add(subSequence);
        }
    }

    resultSet = [...resultSet];
    return resultSet;
};

function getSubSequence(s, i, len) {
    return s.slice(i, i + len);
}

// an alternative code with the same approach.
/**
 * https://leetcode.com/problems/repeated-dna-sequences/
 * Hashing
 * s = the number of letters in the sequence. In our case, it's 10. so the time complexity would be 10*n which boils down to n.
 * Time O(n) | Space O(n)
 * @param {string} s
 * @return {string[]}
 */
var findRepeatedDnaSequences1 = function (s) {
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
