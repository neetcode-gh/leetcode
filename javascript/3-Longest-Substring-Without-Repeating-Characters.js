var lengthOfLongestSubstring = function (str) {
    const hash = {};
    let start = 0;
    let max = 0;

    for (let i = 0; i < str.length; i++) {
        let rightChar = str[i];

        if (!(rightChar in hash)) hash[rightChar] = 0;
        hash[rightChar] += 1;

        while (hash[rightChar] > 1) {
            let leftChar = str[start];
            start += 1;

            if (leftChar in hash) hash[leftChar] -= 1;
            if (hash[leftChar] === 0) delete hash[leftChar];
        }
        max = Math.max(max, i - start + 1);
    }
    return max;
};
