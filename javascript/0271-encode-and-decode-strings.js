/**
 * String - Delimiter
 * Time O(N) | Space O(1)
 * https://leetcode.com/problems/encode-and-decode-strings/
 * @param {string[]} strs
 * @return {string}
 */
var encode = (strs) => {
    return strs
        .map((str) => `${str.length}#${str}`)/* Time O(N) | Ignore Auxillary Space O(N) */
        .join('');                           /* Time O(N) | Ignore Auxillary Space O(N) */
}

/**
 * String - Delimiter
 * Time O(N * K) | Space O(N)
 * https://leetcode.com/problems/encode-and-decode-strings/
 * @param {string} str
 * @return {string[]}
 */
var decode = (str, index = 0, decodedWords = []) => {
    while (index < str.length) {/* Time O(N) */
        const { nextIndex, word } = delimitWord(str, index);/* Time O(K) | Ignore Auxillary Space Space (K) */

        decodedWords.push(word);                            /*           | Ignore Auxillary Space O(N * K ) */
        index = nextIndex;
    }

    return decodedWords;
}

const delimitWord = (str, index) => {
    const delimiter = str.indexOf('#', index);                             /* Time O(K) */
    const length = Number(str.slice(index, delimiter));                    /* Time O(K) */
    const [ start, end ] = [ (delimiter + 1), ((delimiter + length) + 1) ];
    const word = str.slice(start, end);                                    /* Time O(K) | Ignore Auxillary Space O(K) */

    return {
      nextIndex: end,
      word
    };
}

/**
 * Non-ASCII Delimiter - Ignore Auxiliary Space
 * Time O(N) | Space O(1)
 * https://leetcode.com/problems/encode-and-decode-strings/
 * @param {string[]} strs
 * @return {string}
 */
var encode = (strs, nonASCIICode = String.fromCharCode(257)) => {
    return strs.join(nonASCIICode);/* Time O(N) | Ignore Auxillary Space O(N) */
};

/**
 * Non-ASCII Delimiter - Ignore Auxiliary Space
 * Time O(N) | Space O(1)
 * https://leetcode.com/problems/encode-and-decode-strings/
 * @param {string[]} strs
 * @return {string}
 */
var decode = (strs, nonASCIICode = String.fromCharCode(257)) => {
    return strs.split(nonASCIICode);/* Time O(N) | Ignore Auxillary Space O(N) */
};

/**
 * Chunk Transfer Encoding
 * Time O(N) | Space O(1)
 * https://leetcode.com/problems/encode-and-decode-strings/
 * @param {string[]} strs
 * @return {string}
 */
var encode = (strs, sb = []) => {
    for (const str of strs) {/* Time O(N) */
        const code = getCode(str);/* Time O(1) */
        const encoding = `${code}${str}`;

        sb.push(encoding); 
    }

    return sb.join(''); /* Time O(N) | Ignore Auxillary Space O(N) */
}

const getCode = (str) => str
    .length
    .toString(2)
    .padStart(8,'0');

/**
 * Chunk Transfer Encoding
 * Time O(N) | Space O(1)
 * https://leetcode.com/problems/encode-and-decode-strings/
 * @param {string} str
 * @return {string[]}
 */
var decode = (str, output = []) => {
    for (let left = 0, right = (left + 8),length = 0;
        left < str.length;
        left = (right + length), right = (left + 8)
    ) {                                                         /* Time O(N) */
        const countString = str.slice(left, right);             /*           | Ignore Auxillary Space O(K) */
        length = parseInt(countString, 2);

        const decoding = str.slice(right, (right + length));    /* Time O(K) | Ignore Auxillary Space O(N * K) */
        output.push(decoding);                                  /*           | Ignore Auxillary Space O(N * K) */
    }

    return output;
}
