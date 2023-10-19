/**
 * @param {string[]} ideas
 * @return {number}
 */
var distinctNames = function(ideas) {
    let sets = [];
    for (let i = 0; i < 26; i++) {
        sets[i] = new Set();
    }
    for (let s of ideas) {
        sets[s.charCodeAt(0) - 97].add(s.substring(1));
    }
    let same = [];
    for (let i = 0; i < 26; i++) {
        same[i] = Array(26).fill(0);
    }
    for (let i = 0; i < 26; i++) {
        for (let s of sets[i]) {
            for (let j = i + 1; j < 26; j++) {
                if (sets[j].has(s)) {
                    same[i][j]++;
                }
            }
        }
    }
    let res = 0;
    for (let i = 0; i < 26; i++) {
        for (let j = i + 1; j < 26; j++) {
            res += (sets[i].size - same[i][j]) * (sets[j].size - same[i][j]) * 2;
        }
    }
    return res;

};