//////////////////////////////////////////////////////////////////////////////
// Two Stacks
// Time: O(1)
// Space: O(n)
// This solution uses two stacks to save the total values and the minimum
// values. Per each new value if it is less than or equal to the current
// minimum it is pushed to both stacks. We save duplicate minimum values to
// avoid the conundrum of inquiring whether the minimum value can be removed
// (i.e. when the minimum value equals the top value can it be removed or are
// there duplicate values in the main stack).
//////////////////////////////////////////////////////////////////////////////

class MinStack {
    /**
     * @constructor
     */
    constructor() {
        this.mainStack = [];
        this.minStack = [];
    }

    /**
     * @param {number} val
     * @return {void}
     */
    push(val) {
        this.mainStack.push(val);
        if (!this.minStack.length || val <= this.minStack[this.minStack.length - 1]) {
    	    this.minStack.push(val);
        }
    }

    /**
     * @return {void}
     */
    pop() {
        const val = this.mainStack.pop();
        if (val === this.minStack[this.minStack.length - 1]) {
    	    this.minStack.pop();
        }
    }

    /**
     * @return {number}
     */
    top() {
        return this.mainStack[this.mainStack.length - 1];
    }

    /**
     * @return {number}
     */
    getMin() {
        return this.minStack[this.minStack.length - 1];
    }
}

/*Solution - 2 (Without explicitly declaring class) */

// let MinStack = function(){
//     this.stack = [];
//     this.min = [];
// }

// MinStack.prototype.push = function(val){
//     if(this.stack.length === 0){
//         this.min.push(val);
//     }
//     else{
//         if(val<this.min[this.min.length-1]){
//             this.min.push(val);
//         }
//         else{
//             this.min.push(this.min[this.min.length-1]);
//         }
//     }
//     this.stack.push(val);
// }

// MinStack.prototype.pop = function(){
//     this.stack.pop();
//     this.min.pop();
// }

// MinStack.prototype.top = function(){
//     return this.stack[this.stack.length-1];
// }

// MinStack.prototype.getMin = function(){
//     return this.min[this.min.length-1];
// }
