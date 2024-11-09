/**
 * @param {string} s
 * @return {string}
 */
var finalString = function (s) {
    // initialize empty string str
    let str = "";

    // loop thorugh the every character of string s
    for (let i = 0; i < s.length; i++) {

        // if every character of string is i then reverse the previous string character and store in string str
        if (s[i] == 'i') {
            str = [...str].reverse().join('');
        } else {
            // else add every character of string s with str and store in string str
            str += s[i];
        }
    }

    // return string str
    return str;
};