const ALPHA_NUM = /^[a-zA-Z0-9]$/;

function isPalindrome(s) {

    let l = 0;
    let r = s.length - 1;

    while(l < r){
        while(l < r && !ALPHA_NUM.test(s[l])){
            l++;
        }
        while(l < r && !ALPHA_NUM.test(s[r])){
            r--;
        }

        if(s[l].toLowerCase() !== s[r].toLowerCase()) {
            return false;
        }

        l++;
        r--;
    }

    return true;
}
