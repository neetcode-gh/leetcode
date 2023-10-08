/**
 * @param {string[]} ideas
 * @return {number}
 */

// Time complexity: O(n^2 * m)
// Space complexity: O(n * m)

var distinctNames = function (ideas) {
    const wordMap = new Map();
    let count = 0;

    for (const word of ideas) {
        const ch = word.charAt(0);
        const substr = word.slice(1);
        const set = wordMap.get(ch) ?? new Set();
        set.add(substr);
        wordMap.set(ch, set);
    }

    for (const [ch1, set1] of wordMap) {
        for (const [ch2, set2] of wordMap) {
            if (ch1 === ch2) {
                continue;
            }

            const intersect = getIntersection(set1, set2);
            const distinct1 = set1.size - intersect;
            const distinct2 = set2.size - intersect;
            count += distinct1 * distinct2;
        }
    }

    return count;
};

const getIntersection = (set1, set2) =>
    [...set1].filter((word) => set2.has(word)).length;
