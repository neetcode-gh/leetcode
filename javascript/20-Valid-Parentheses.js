/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    
    let closeMap = {
        '}' :'{',
        ')' : '(',
        ']' : '['
    };
    
    let charStack = [];
    
    if (!s) return false;
    
    for (let i = 0; i < s.length; i++) {
        let curr = s.charAt(i);
        // check if closing bracket
        if (closeMap[curr]) {
            topElement = (charStack.length === 0) ? '#' : charStack.pop();
            if (topElement !== closeMap[curr]) {
                return false;
            }
            // opening bracket case
        } else {
            charStack.push(curr);
        }
    }
    
    return charStack.length === 0;
};

/* Solution - 2 (Using ES6 features) */

// let validParanthesis = (sequence) => {
//     if(sequence.length === 0) return false;
//     let count = 0;
//     const stack = [];
//     const bracketMap = new Map();
//     bracketMap.set(')','(');
//     bracketMap.set('}','{');
//     bracketMap.set(']','[');

//     for(const char of sequence){
//         if(bracketMap.has(char)){
//             if(stack!== 0 && stack[stack.length-1] === bracketMap.get(char)){
//                 stack.pop();
//             }
//             else{
//                 return false;
//             }
//         }
//         else{
//             stack.push(char);
//         }
        
//     }
//     if(stack.length === 0){
//         return true
//     }
//     else{
//         return false
//     }
        
// }
