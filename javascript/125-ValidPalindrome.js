/**
 * @param {string} s
 * @return {boolean}
 */
 var isPalindrome = function(s) {
    let start = 0
    let end = s.length - 1
    
    while (start < end) {
        while(start < end && !isAlphanumeric(s[start])) {
            start++
        }
        while(end > start && !isAlphanumeric(s[end])) {
            end--
        }
        
        if(s[start].toLowerCase() !== s[end].toLowerCase()) {
            return false
        }
        
        start++
        end--
    }
    
    return true
};

const isAlphanumeric = c => {
    return 'A'.charCodeAt(0) <= c.charCodeAt(0) && c.charCodeAt(0) <='Z'.charCodeAt(0) || 
            'a'.charCodeAt(0) <= c.charCodeAt(0) && c.charCodeAt(0) <='z'.charCodeAt(0) ||
            '0'.charCodeAt(0) <= c.charCodeAt(0) && c.charCodeAt(0) <='9'.charCodeAt(0)
}