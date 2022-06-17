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


/*
Brute Force plan:
1).X?() method that removes all spaces and non alpha-numeric characters.
Can't remember the name, have to google this one -> .replace(/[^A-Za-z0-9]/g, ''),
.replace(/\W/g, '') does not remove the underscore '_' and causes failure
2).toLowerCase() method eliminates case sensitivity
3)Init two pointers; front & back
4)Create while loop;
a)start at opposing ends of s
b)compare each value front to back === back to front
c)create short circuit for failure front !== back
d)increment and decrement front & back
Return Boolean
*/

var isPalindrome = function(s) {
    let str = s.replace(/[^A-Za-z0-9]/g, '').toLowerCase(); 
    //console.log(str); // if you want to see the results of the above methods
    let front = 0;
    let back = str.length-1;
    
    while (front < back) {
        if(str[front] !== str[back]) return false;
        //short circuit for false condition
        front++;
        back--;
    }
    return true;
};

//Runtime: 81 ms, faster than 83.30% of JavaScript online submissions for Valid Palindrome.
//Memory Usage: 44.5 MB, less than 68.62% of JavaScript online submissions for Valid Palindrome.
