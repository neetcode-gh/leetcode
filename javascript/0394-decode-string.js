/**
 * Stack
 * https://leetcode.com/problems/decode-string/
 * 
 * Time O(n) | Space O(n)
 * @param {string} s
 * @return {string}
 */
var decodeString = function(s) {
  const myStack = [];

  for(let i = 0; i < s.length; i++) {
    if(s[i] !== ']') {
      myStack.push(s[i]);
      continue;
    } 

    let subStr = [];
    while(myStack[myStack.length - 1] !== '[') {
      subStr.push(myStack.pop());
    }
    subStr = subStr.reverse();
    myStack.pop();

    let k = [];
    while(!isNaN(myStack[myStack.length - 1])) {
      k.push(myStack.pop());
    }
    k = k.reverse();
    myStack.push(subStr.join('').repeat(+k.join('')));
  }  

  return myStack.join('');
};
