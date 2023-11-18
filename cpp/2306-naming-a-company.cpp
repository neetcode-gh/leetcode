//time O(n)
//space O(n)

class Solution {
public:
    long long distinctNames(vector<string>& ideas) {
        
        unordered_map<char,unordered_set<string>> dict;
        
        for(const string& idea : ideas){
            dict[idea[0]].insert(idea.substr(1));
        } 
        
        if(dict.size() < 2){
            return 0;
        }
         
        long long count = 0;
        
        for(char a = 'a'; a <= 'z' ; a++){
             
            if(dict.find(a) == dict.end())
                continue;
                        
            for(char b = a+1; b <= 'z'; b++){
                
                if(dict.find(b) == dict.end())
                    continue;
                
                int aKeys = dict[a].size();
                int bKeys = dict[b].size();
                 
                for(const string& suffix : dict[a]){
                    if(dict[b].find(suffix) != dict[b].end()){
                        aKeys--;
                        bKeys--;
                    }
                }
                
                count += 2 * (aKeys*bKeys);
            }
        }
        
        return count;
    }
};
