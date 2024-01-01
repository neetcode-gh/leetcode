/**
 * @param {string} num
 * @return {string}
 */
var removeTrailingZeros = function (num) {

    for (let i = num.length - 1; i >= 0; i--) { // loop through the every element of string num from end
        if (num[i] != 0) {  // if every character of num is not equal to zero
            return num.slice(0, i + 1); // return  the character of num upto ith character
        }
    }
};