/**
 * @param {string} s
 * @return {number[]}
 */
var partitionLabels = function (s) {
    var lastIndex = {}, // char -> last index in s
        res = [],
        size = 0,
        end = 0;

    for (var i in s) {
        lastIndex[s[i]] = i;
    }

    for (var i in s) {
        var c = s[i];
        size++;
        end = Math.max(end, lastIndex[c]);
        if (i === String(end)) {
            res.push(size);
            size = 0;
        }
    }

    return res;
};
