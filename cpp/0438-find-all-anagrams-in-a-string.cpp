class Solution{    
    public:    
        unordered_map<char, int> Create(string p){            
            unordered_map<char, int> Mapp;            
            for(char & i : p){                
                if(Mapp.find(i) == Mapp.end()){                    
                    Mapp.insert(make_pair(i, 1));                    
                }
                else{                    
                    Mapp[i]++;                    
                }                
            }            
            return Mapp;            
        }    
        vector<int> findAnagrams(string s, string p){            
            unordered_map<char, int> Maps, Mapp = {};            
            vector<int> nums = {};            
            int Fp, Sp;            
            int lens, lenp;            
            Fp = 0;            
            Sp = p.length();            
            lens = s.length();            
            lenp = p.length();            
            Mapp = Create(p);            
            Maps = Create(s.substr(0, p.length()));            
            for(Fp = 0; Fp < lens - lenp + 1; Fp++){   
                if(Maps == Mapp){                    
                    nums.push_back(Fp);                    
                }                
                if(Maps.find(s[Sp]) != Maps.end()){                    
                    Maps[s[Sp]]++;                
                }
                else{                    
                    Maps.insert(make_pair(s[Sp], 1));                                            
                }                                            
                Sp++;                
                Maps[s[Fp]]--;                
                if(Maps[s[Fp]] == 0){                    
                    Maps.erase(s[Fp]);                    
                }                    
            }            
            return nums;
        }    
};
