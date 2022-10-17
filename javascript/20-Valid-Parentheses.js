/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    let stack = [];
    let map = {
        '}': '{',
        ']': '[',
        ')':'(',
    };
    if(s.length < 2) return false;
    for(let i=0; i<s.length; i++){
        if(s[i] in map){
            if(stack[stack.length-1] == map[s[i]]){
                stack.pop();
            } else{
                return false;
            }
        } else {
            stack.push(s[i]);
        }
    }
    return stack.length == 0;
};
