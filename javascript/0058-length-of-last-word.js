/**
 * @param {string} s
 * @return {number}
 */
 var lengthOfLastWord = function(s) {
    let len = 0;
    
    for(let i in s) {
        if(s[i] != ' ') {
            if(s[i-1] == ' ') len = 1;
            else len += 1;
        }
    }
    return len;
};

// another approach. starting out from the last so we don't have to go all the way to the end.
var lengthOfLastWord = function(s) {

    let firstCharOccurance = false;
    let lastWordLen = 0;

    for(let i = s.length - 1; i > -1; i--) {
        if(s[i] !== ' ') {
            firstCharOccurance = true;
            lastWordLen++;
        }
        if(firstCharOccurance && s[i] === ' ') {
            break;
        }
    }
    return lastWordLen;
};
