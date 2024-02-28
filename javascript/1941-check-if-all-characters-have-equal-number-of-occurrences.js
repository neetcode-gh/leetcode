/**
 * @param {string} s
 * @return {boolean}
 */
var areOccurrencesEqual = function (s) {
    let arr = []
    for (i = 0; i < s.length; i++) {
        let count = 0;
        for (j = 0; j < s.length; j++) {
            if (s[i] == s[j]) {
                if (i > j) {
                    break;
                }
                count++
            }
        }
        if (count != 0) {
            arr.push(count)
        }
    }
    let set = new Set(arr)
    return set.size == 1
};