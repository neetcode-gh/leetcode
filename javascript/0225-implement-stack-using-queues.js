var MyStack = function() {
    this.q = [];
};

MyStack.prototype.push = function(x) {
    this.q.push(x);
};

MyStack.prototype.pop = function() {
    let size = this.q.length;
    for(let i = 0; i < size - 1; i++)
        this.push(this.q.shift());
    return this.q.shift();
};

MyStack.prototype.top = function() {
    let size = this.q.length;
    for(let i = 0; i < size - 1; i++)
        this.push(this.q.shift());
    let res = this.q.shift();
    this.push(res);
    return res;
};

MyStack.prototype.empty = function() {
    return this.q.length == 0
};
