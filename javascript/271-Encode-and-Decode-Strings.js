/**
 * @param {string[]} strs
 * @return {string}
 */
var encode = function (strs) {
    let res = "";
    for (const s of strs) res += String(s.length) + "#" + s;
    return res;
}

/**
 * @param {string} str
 * @return {string[]}
 */
var decode = function (str) {
    const res = [];
    let i = 0;

    while (i < str.length) {
        let j = i;
        while (str[j] != "#") j += 1;

        length = Number(str.slice(i, j));
        res.push(str.slice(j + 1, j + 1 + length));
        i = j + 1 + length;
    }

    return res;
}

