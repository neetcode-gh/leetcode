/**
 * @param {string[]} strs
 * Time O(N) | Space O (N)
 * @return {string}
 */
function encode(strs) {
    return strs.map(str => `${str.length}#${str}`).join('');
}

/**
 * @param {string} str
 * Time O(N) | Space O (N)
 * @return {string[]}
 */
function decode(str, index = 0, decodedWords = []) {
    while (index < str.length) {
        const { nextIndex, word } = delimitWord(str, index);

        decodedWords.push(word);

        index = nextIndex;
    }

    return decodedWords;
}

const delimitWord = (str, index) => {
    const delimiter = str.indexOf('#', index);
    const length = Number(str.slice(index, delimiter));
    const [ start, end ] = [ (delimiter + 1), (delimiter + length) + 1 ];
    const word = str.slice(start, end);
    
    return {
      nextIndex: end,
      word
    };
}

