// Time and space complexity is O(n) where n is the size of the input string.
class Solution {
public:
    string removeDuplicates(string s, int k) {
      stack<pair<char , int>> st;
      
      for(int i = 0 ; i < s.size(); i++)
      {
        int count = 1;
        if(!st.empty() && st.top().first == s[i])
        {
          count += st.top().second;
          st.pop();
        }
        
        st.push({s[i] , count});
        
        if(count == k) st.pop();
        
      }
      
      string ans = "";
      while(!st.empty())
      {
        int freq = st.top().second;
        int c = st.top().first;
        while(freq > 0)
        {
           ans += c;
           freq--;
        }
        
        st.pop();
      }
      
      reverse(ans.begin() , ans.end());
      return ans;
    }
};
