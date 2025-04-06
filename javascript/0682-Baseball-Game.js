/**
 * @param {string[]} operations
 * @return {number}
 */
var calPoints = function (operations) {
    const stack = [];
    for(const op of operations){
        if(op==="+"){
            stack.push(stack[stack.length - 1] + stack[stack.length - 2]);
        }else if(op==="C"){
            stack.pop()
        }else if(op==="D"){
            stack.push(stack[stack.length - 1] * 2);
        }else{
            stack.push(parseInt(op))
        }
    }
    return stack.reduce((prev,curr)=>prev+curr,0)
};
