/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
    const charMap = new Map();
    let matches = 0;
    const matchIdx = [];

    for (const char of p) {
        const charCount = charMap.get(char) || 0;
        charMap.set(char, charCount + 1);
    }

    let leftWindow = 0;
    for (let rightWindow = 0; rightWindow < s.length; rightWindow++) {
        const rightChar = s[rightWindow];
        if (charMap.has(rightChar)) {
            const rightCharCount = charMap.get(rightChar);
            charMap.set(rightChar, rightCharCount - 1);
            if (charMap.get(rightChar) === 0) {
                matches++;
            }
        }
        if (rightWindow >= p.length) {
            const leftChar = s[leftWindow];
            if (charMap.has(leftChar)) {
                const leftCharCount = charMap.get(leftChar);
                charMap.set(leftChar, leftCharCount + 1);
                if (leftCharCount === 0) {
                    matches--;
                }
            }
            leftWindow++;
        }
        if (matches === charMap.size) {
            matchIdx.push(leftWindow);
        }
    }
    return matchIdx;
};
