class Solution {
public:
    int partitionString(string s) {
        unordered_set<char> hashSet;
        int res = 1;
        int n = s.size();
        for(int i=0; i<n; i++){
            if(hashSet.find(s[i]) == hashSet.end()){
                hashSet.insert(s[i]);
            }
            else{
                hashSet.clear();
                res++;
                hashSet.insert(s[i]);
            }
        }
        return res;
    }
};