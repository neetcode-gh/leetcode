class Solution{    
    public:    
        unordered_map<char, int> Map = {};    
        int firstUniqChar(string s){            
            char c;            
            int Min;            
            for(int i = 0; i < s.length(); i++){                
                if(Map.find(s[i]) != Map.end()){                    
                    Map[s[i]]++;                    
                }
                else{                    
                    Map.insert(make_pair(s[i], 1));                    
                }                
            }            
            Min = s.length();            
            for(auto & m : Map){                
                if((m.second == 1) && (s.find(m.first) < Min)){                    
                    c = m.first;                    
                    Min = s.find(m.first);                    
                }                
            }            
            return Min == s.length() ? -1 : Min;
        }       
};
