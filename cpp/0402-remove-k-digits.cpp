// Time Complexity is O(N) where N is the size of the input string.
// Space complexity is O(N) as well
class Solution {
public:
    string removeKdigits(string num, int k) {
      int n = num.size();
      
      stack<char>s;
      int count = k;
      
      for(int i = 0 ; i < n; i++)
      {
        while(!s.empty() && count > 0 && s.top() > num[i])
        {
          s.pop();
          count--;
        }
        s.push(num[i]);
      }
      
      // In case the num was already in a non increasing order (e.x: 123456)
      while(s.size() != n - k) s.pop();
     
      string res = "";
      while(!s.empty())
      {
        res += s.top();
        s.pop();
      }
      reverse(res.begin() , res.end());
      // Remove the zeros from the left if they exist.
      while (res[0] == '0') res.erase(0 , 1);
    
      
      return (res == "") ? "0": res;
    }
};
