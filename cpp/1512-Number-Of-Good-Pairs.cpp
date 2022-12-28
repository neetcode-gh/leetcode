class Solution { 
        unordered_map<int, int> Memo = {};    
        int numIdenticalPairs(vector<int> & nums){            
            unordered_map<int, int> Memo;            
            int i, k;            
            int NGood;            
            NGood = 0;            
            Memo = {};            
            for(int & i : nums){                
                if(Memo.find(i) == Memo.end()){                    
                    Memo.insert(make_pair(i, 1));                
                }
                else{                    
                    NGood = NGood + Memo[i];                    
                    Memo[i]++;                    
                }                
            }            
            return NGood;            
        }    
};
