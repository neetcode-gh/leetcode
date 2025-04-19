/*
    Time - O(C) [C = Total length of all the words]
*/    

class Solution {
private:
    bool dfs(char ch, unordered_map<char, unordered_set<char>> &adj, 
        unordered_map<char, bool> &visit, string &res) {
        if(visit.find(ch) != visit.end())
            return visit[ch];

        visit[ch] = true;
        for(auto it: adj[ch]) {
            if(dfs(it, adj, visit, res))
                return true;
        }
        visit[ch] = false;
        res += ch;
        return false;
    }

public:
    string alienOrder(vector<string>& words) {
        unordered_map<char, unordered_set<char>> adj;
        int n = words.size();

        for(auto word: words)
            for(auto ch: word)
                adj[ch] = unordered_set<char>();

        for(int i = 0; i < n-1; i++) {
            string s1 = words[i], s2 = words[i+1];
            int minLen = min(s1.size(), s2.size());
            if(s1.size() > s2.size() && s1.substr(0, minLen) == s2.substr(0, minLen))
                return "";
            
            for(int j = 0; j < minLen; j++) {
                if(s1[j] != s2[j]) {
                    adj[s1[j]].insert(s2[j]);
                    break;
                }
            }
        }

        unordered_map<char, bool> visit;
        string res = "";
        for(auto chMap: adj) {
            if(dfs(chMap.first, adj, visit, res))
                return "";
        }
        reverse(res.begin(), res.end());
        return res;
    }
};
