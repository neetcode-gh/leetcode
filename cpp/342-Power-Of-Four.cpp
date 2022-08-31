class Solution{    
    public:    
        bool isPowerOfFour(int n){            
            if(n <= 0){                
                return false;                
            }            
            bool pow = true;            
            while((n > 1) && (pow == true)){                
                n % 4 == 0 ? n = n / 4 : pow = false;                
            }            
            return pow;
        }    
};
