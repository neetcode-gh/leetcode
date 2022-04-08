class Solution {
public:
    vector<int> findSubstring(string s, vector<string>& words) {
        
        unordered_map<string,int> mp;
        for(string word:words){
            mp[word]++;
        }
        
        int slen=s.size();
        int wlen=words.size();
        int len=words[0].size();
        
        vector<int> ans;
        for(int i=0;i<slen-wlen*len+1;i++){
            string temp=s.substr(i,wlen*len);
            unordered_map<string,int> seen;
            for(int j=0;j<temp.size();j+=len){
                string curr=temp.substr(j,len);
                seen[curr]++;
            }
            if(seen==mp){
                ans.push_back(i);
            }
        }
        return ans;
    }
};