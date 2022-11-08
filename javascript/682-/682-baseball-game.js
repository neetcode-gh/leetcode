// problem link https://leetcode.com/problems/baseball-game/
// time complexity  O(n).

var calPoints = function(ops) {
    
       const outputArr = [];
    
    ops.forEach((op) => {
        
         switch(op) {
             case 'D':
                 outputArr.push(+outputArr[outputArr.length - 1] * 2);
                 break;
             case "C":
                 outputArr.pop();
                 break;
             case "+":
                outputArr.push(+outputArr[outputArr.length - 1] + +outputArr[outputArr.length - 2]);
                 break;
             default:
                 outputArr.push(+op);
         }    
    });
    
 const result = outputArr.reduce((pre, currunt) => {
        return currunt + pre;
    },0);
    
    return result;
};
