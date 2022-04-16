var MinStack = function() {
    this.stack=[];
    this.minStack=[];
};

/** 
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function(val) {
    this.stack.push(val);
    val = Math.min(val, this.minStack ? this.minStack[-1]  : val)
    this.minStack.push(val);
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    this.stack.pop();
    this.minStack.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    const n = this.stack.length;
    return n == 0
        ? undefined
        : this.stack[n-1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    const n = this.mins.length;
    return n == 0
        ? Number.MAX_VALUE
        : this.mins[n-1];
};
