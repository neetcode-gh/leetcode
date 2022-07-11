/**
 * @param {string[]} strs
 * @return {string}
 */
function encode(strs) {
    return strs.map(str => `${str.length}#${str}`).join('');
}

/**
 * @param {string} str
 * @return {string[]}
 */
function decode(str) {
    const res = [];
    let i = 0;

    while (i < str.length) {
        let j = i;
        while (str[j] !== "#") {
            ++j;
        }

        const len = Number(str.slice(i, j));
        res.push(str.slice(++j, j + len));
        i = j + len;
    }

    return res;
}

