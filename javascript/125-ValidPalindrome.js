class isValidPalindrome {
    constructor(string){
        this.string=string;
    }
    isPalindrome(string){
        let left =0;
        let right=string.length-1;
        while(left<right){
            while(left<right && this.isAlphaNumeric(string[left])){
                left++
            }
            while(right>left && this.isAlphaNumeric(string[right])){
                right--
            }
            if(string[left].toLowerCase()!=string[right].toLowerCase()) {
                return false;
            }
            left++
            right--  
        }
        return true
    }

    isAlphaNumeric(c){
        return ('A'.charCodeAt(0) <= c.charCodeAt(0) <='Z'.charCodeAt(0) || 
                'a'.charCodeAt(0) <= c.charCodeAt(0) <='z'.charCodeAt(0) ||
                '0'.charCodeAt(0) <= c.charCodeAt(0) <='9'.charCodeAt(0))
    }
    
}