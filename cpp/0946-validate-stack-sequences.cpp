class Solution {
public:
    bool validateStackSequences(vector<int>& pushed, vector<int>& popped) {
         int i=0;
         stack<int> stk;
         for(const auto& itm: pushed){
             stk.push(itm);
             while(i<pushed.size() && !stk.empty() && stk.top() == popped[i]){
                 stk.pop();
                 i += 1;
             }
         }  
         return stk.empty();
    }
};
