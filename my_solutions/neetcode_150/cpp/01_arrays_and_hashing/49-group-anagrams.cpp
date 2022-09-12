#include <bits/stdc++.h>

using namespace std;

class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        vector<vector<string>> ans;
        unordered_map<string, vector<string>> v;

        for(string str: strs) {
            string sor = str;
            sort(sor.begin(), sor.end());
            v[sor].push_back(str);
        }

        for (auto i: v) {
            ans.push_back(i.second);
        }

        return ans;
    }
};

int main(int argc, char const *argv[])
{
    
    return 0;
}