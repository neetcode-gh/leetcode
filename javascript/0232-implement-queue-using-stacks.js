// https://leetcode.com/problems/implement-queue-using-stacks/

var MyQueue = function() {
    this.stack1 = [];
    this.stack2 = []; 
};

/** 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
    this.stack1.push(x);
};

/**
 * @return {number}
 */
MyQueue.prototype.pop = function() {
    this.swappingStacks();
    
    if(!this.stack2.length){
        return null;
    }
    return this.stack2.pop();
};

/**
 * @return {number}
 */
MyQueue.prototype.peek = function() {
    this.swappingStacks();
    return this.stack2.length == 0 ? null : this.stack2[this.stack2.length-1]
};

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
    return this.stack1.length === 0 && this.stack2.length === 0;
};

MyQueue.prototype.swappingStacks = function() {
    if (this.stack1.length) {
        this.stack2 = [...this.stack1.reverse(), ...this.stack2];
        this.stack1 = [];
    }
}

/** 
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */
