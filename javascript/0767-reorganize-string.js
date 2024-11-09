/**
 * MaxHeap | Hashing
 * Time O(n*log(n)) | Space O(n)
 * https://leetcode.com/problems/reorganize-string/
 * @param {string} s
 * @return {string}
 */
var reorganizeString = function(s) {

    const maxQ = new MaxPriorityQueue({
        compare: (a, b) => {
            return b[0] - a[0]; 
        }
    });

    const freq = {};
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        freq[char] = (freq[char] && freq[char] + 1 || 1);
    }
    for (const key in freq) {
        const val = freq[key];
        maxQ.enqueue([val, key]);
    }

    let orgStr = "";
    while (!maxQ.isEmpty()) {

        const [occurance, char] = maxQ.dequeue();

        if (orgStr[orgStr.length - 1] === char) {

            if (maxQ.isEmpty()) return "";

            const [occurance1, char1]  = maxQ.dequeue();
            orgStr += char1;
            if (occurance1 - 1) {
                maxQ.enqueue([occurance1 - 1, char1]);
            }   
            maxQ.enqueue([occurance, char]);
        } else {
            orgStr += char;
            if (occurance - 1) {
                maxQ.enqueue([occurance - 1, char]);
            }
        }
    }

    return orgStr;
};
