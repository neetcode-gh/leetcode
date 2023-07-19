/**
 * @param {string[]} ideas
 * @return {number}
 */

// Time complexity: O(n^2 * m)
// Space complexity: O(n * m)

var distinctNames = function (ideas) {
    const wordMap = new Map();
    let count = 0;

    ideas.forEach((word) => {
        const ch = word.charAt(0);
        const substr = word.slice(1);
        const set = wordMap.get(ch) ?? new Set();
        set.add(substr);
        wordMap.set(ch, set);
    });

    for (const [ch1, set1] of wordMap) {
        for (const [ch2, set2] of wordMap) {
            if (ch1 === ch2) {
                continue;
            }

            const intersect = calculateIntersection(set1, set2);
            const distinct1 = set1.size - intersect;
            const distinct2 = set2.size - intersect;
            count += distinct1 * distinct2;
        }
    }

    return count;
};

function calculateIntersection(set1, set2) {
    let intersect = 0;
    set1.forEach((word) => {
        if (set2.has(word)) {
            intersect += 1;
        }
    });
    return intersect;
}
