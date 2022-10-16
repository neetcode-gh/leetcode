var decodeString = function(s) {
    const myStack = [];
let result = '';
for(let i = 0; i < s.length; i++) {
    if(s[i] !== ']') {
        myStack.push(s[i]);
    } else {
        let subStr = '';
        while(myStack[myStack.length - 1] !== '[') {
            subStr = myStack.pop() + subStr;
        }
        myStack.pop();
        let k = '';
        while(!isNaN(myStack[myStack.length - 1])) {
            k = myStack.pop() + k;
        }
       myStack.push(subStr.repeat(+k));
    }
}  
return myStack.join('');
};
