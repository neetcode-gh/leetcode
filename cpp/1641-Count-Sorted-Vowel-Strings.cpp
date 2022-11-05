class Solution{    
    public:            
        int countVowelStrings(int n){            
            int An, En, In, On, Un;            
            int An1, En1, On1, In1, Un1;            
            int i;            
            An1 = En1 = In1 = On1 = Un1 = 1;            
            i = 1;            
            while(i < n){                
                An = An1 + En1 + On1 + In1 + Un1;                
                En = En1 + On1 + In1 + Un1;                
                In = In1 + On1 + Un1;                
                On = On1 + Un1;                
                Un = Un1;                
                An1 = An;                
                En1 = En;                
                On1 = On;                
                In1 = In;                
                i++;                
            }            
            return An1 + En1 + In1 + On1 + Un1;
        }     
};
