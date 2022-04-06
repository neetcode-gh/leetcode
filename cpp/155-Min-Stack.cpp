using namespace std;
class MinStack {
public:
    stack<pair<int, int>> stk;
    int m;
    
    MinStack() {
        m = INT_MAX;
    }
    
    void push(int val) {
        stk.push({val, min(val, stk.empty()?INT_MAX:stk.top().second)});
    }
    
    void pop() {
        if(!stk.empty()) stk.pop();
    }
    
    int top() {
        return stk.top().first;
    }
    
    int getMin() {
        return stk.top().second;
    }
};

/**
 * Your MinStack object will be instantiated and called as such:
 * MinStack* obj = new MinStack();
 * obj->push(val);
 * obj->pop();
 * int param_3 = obj->top();
 * int param_4 = obj->getMin();
 */