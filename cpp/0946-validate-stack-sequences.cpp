/*
  Given two integer arrays pushed and popped each with distinct values,
  return true if this could have been the result of a sequence of push
  and pop operations on an initially empty stack, or false otherwise.

  Time: O(n)
  Space: O(n)
*/

class Solution {
public:
    bool validateStackSequences(vector<int>& pushed, vector<int>& popped) {
        stack<int> stk;
        int i = 0;
        for (int num : pushed) {
            stk.push(num);
            while (!stk.empty() && stk.top() == popped[i]) {
                stk.pop();
                ++i;
            }
        }
        return stk.empty();
    }
};

