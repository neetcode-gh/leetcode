class Solution {
public:
    bool checkValidString(string s) {
        int n = s.size();
    
        int balanced = 0;
        for(int i=0; i<n; i++) {
            if(s[i] == '(' || s[i] == '*') 
                balanced++;
            else 
                balanced--;

            if(balanced < 0) 
                return false;
        }

        if(balanced == 0) 
            return true;

        balanced = 0;
        for(int i=n-1; i>=0; i--) {
            if(s[i] == ')' || s[i] == '*') 
                balanced++;
            else 
                balanced--;

            if(balanced < 0) 
                return false;
        }

        return true;
    }
};