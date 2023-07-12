/**
 * @param {string[]} ideas
 * @return {number}
 */

// Time complexity: O(n^2 * m)
// Space complexity: O(n * m)

var distinctNames = function (ideas) {
    const wordMap = new Map();
    let res = 0;

    ideas.forEach((word) => {
        const ch = word.charAt(0);
        const substr = word.slice(1);
        if (!wordMap.has(ch)) {
            wordMap.set(ch, new Set());
        }
        wordMap.get(ch).add(substr);
    });

    for (const [ch1, set1] of wordMap.entries()) {
        for (const [ch2, set2] of wordMap.entries()) {
            if (ch1 === ch2) {
                continue;
            }
            let intersect = 0;
            set1.forEach((word) => {
                if (set2.has(word)) {
                    intersect += 1;
                }
            });
            const distinct1 = set1.size - intersect;
            const distinct2 = set2.size - intersect;
            res += distinct1 * distinct2;
        }
    }

    return res;
};
