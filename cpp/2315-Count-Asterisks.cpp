class Solution{    
    public:
        int countAsterisks(string s){            
            int NAst;            
            bool Coppia;            
            Coppia = false;            
            NAst = 0;            
            for(char & c : s){                
                if((c == '*') && (Coppia == false)){                                
                    NAst++;                        
                }                
                if(c == '|'){                    
                    Coppia = !Coppia;                    
                }
            }            
            return NAst;
        }    
};
