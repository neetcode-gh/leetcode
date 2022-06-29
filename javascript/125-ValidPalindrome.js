var isPalindrome = function(s) {
    let l = 0, r = s.length-1;
    while(l<r){
        while(l < r && !isAlphaNumeric(s[l])){
            l++;
        }
        while(r > l && !isAlphaNumeric(s[r])){
            r--;
        }
        if(s[l].toLowerCase() !== s[r].toLowerCase()) return false;
        l++;
        r--;
    }
    return true;

    function isAlphaNumeric(c){
        return (
            ('A'.charCodeAt(0) <= c.charCodeAt(0) &&  c.charCodeAt(0) <= 'Z'.charCodeAt(0)) ||
            ('a'.charCodeAt(0) <= c.charCodeAt(0) &&  c.charCodeAt(0) <= 'z'.charCodeAt(0)) ||
            ('0'.charCodeAt(0) <= c.charCodeAt(0) &&  c.charCodeAt(0) <= '9'.charCodeAt(0))
        )
    }
};
