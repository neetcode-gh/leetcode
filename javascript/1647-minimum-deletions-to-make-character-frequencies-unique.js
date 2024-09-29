/**
 * Hasing
 * Time O(n) | Space O(n)
 * https://leetcode.com/problems/minimum-deletions-to-make-character-frequencies-unique/
 * @param {string} s
 * @return {number}
 */
var minDeletions = function(s) {
    
    // hash frequency
    let i = 0;
    const charHash = new Map();
    while (i < s.length)  {
        const frequency = charHash.get(s[i]) || 0;
        charHash.set(s[i], frequency + 1);
        i++;
    }
    const frequencyHash = new Map();
    for (const [key, val] of charHash) {
        const frequency = frequencyHash.get(val) || 0;
        frequencyHash.set(val, frequency + 1);
    }

    let min = 0;
    for (const [key, val] of frequencyHash) {
        let frequency = key;
        let frequencyOfFrequency = val;
        while(frequencyOfFrequency > 1) {
            while(frequencyHash.has(frequency)) {
                frequency -= 1;
                min += 1;
            }
            if (frequency > 0) frequencyHash.set(frequency, 1);
            frequency = key;
            frequencyOfFrequency -= 1;
        }
    }
    return min;
};
