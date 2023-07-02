/**
 * Stack
 * https://leetcode.com/problems/simplify-path/
 * 
 * Time O(n) | Space O(n)
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function(path) {
    let currunt = '';
    let myStack = [];
    path = `/${path}/`;
    for(let i = 0; i < path.length; i++) {
        
        console.log(myStack);
        if(path[i] === '/') {
            if(currunt == '..') {
                if(myStack.length) {
                    myStack.pop();
                }
            } else if(currunt !== '' && currunt !== '.') {
                myStack.push(currunt);
            }
            currunt = '';
        } else {
            currunt += path[i];
        }
    }

    myStack = myStack.join('/');
    myStack = '/' + myStack;
    return myStack;
};
