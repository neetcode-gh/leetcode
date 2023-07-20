//https://leetcode.com/problems/online-stock-span/
class StockSpanner {
    constructor() {
      this.stack = [];
    }
    
    // Time O(1) | Space O(1)
    isEmpty() {
      return this.stack.length === 0;
    }
    
    // Time O(1) | Space O(1)
    peek() {
      return this.isEmpty() ? null : this.stack[this.stack.length - 1];
    }
    
    // Time O(1) | Space O(1)
    push(val) {
      return this.stack.push(val);
    }
  
    // Time O(1) | Space O(1)
    pop() {
      return this.stack.pop();
    }
  
    // Time O(n) | Space O(1)
    next(price) {
      let currunt = 1;
      while (this.peek() && this.peek()[0] <= price) {
        currunt += this.pop()[1];
      }
      this.push([price, currunt]);
      return this.peek()[1];
    }
  }
