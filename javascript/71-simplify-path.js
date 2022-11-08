// problem link https://leetcode.com/problems/simplify-path
// time complexity O(n)

var simplifyPath = function(path) {
       let currunt = '';
    let myStack = [];
    path = '/' + path + '/';
    for(let i = 0; i < path.length; i++) {
    
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
