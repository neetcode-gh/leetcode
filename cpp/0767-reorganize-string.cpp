// Time: O(NlogN)
// Space: O(N)

class Solution {
public:
    string reorganizeString(string s) {
        string res="";

        unordered_map<char, int> mp;
        priority_queue<pair<int, char>> maxh;
        
        for(auto ch : s)
            mp[ch] += 1;
        
        for(auto m : mp)
            maxh.push(make_pair(m.second, m.first));
        
        while(maxh.size() > 1){
            auto top1= maxh.top();
            maxh.pop();
            auto top2 = maxh.top();
            maxh.pop();
            
            res += top1.second;
            res += top2.second;
            
            if(--top1.first > 0)
                maxh.push(top1);
            
            if(--top2.first > 0)
                maxh.push(top2);
        }
        
        if(!maxh.empty()){
            if(maxh.top().first > 1)
                return "";
            
            else
                res += maxh.top().second;
        }
        
        return res;
    }
};
