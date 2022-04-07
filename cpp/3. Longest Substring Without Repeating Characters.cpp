class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        if(s.length()==1)
            return 1;
        
        int j,max=0,count=0,found;   
        string ss="";
        for(j=0;j<s.length();j++){
            found=ss.find(s[j]);
            if(found<0){
                count++;
                ss+=s[j];     
            }else{
                ss.erase(0,found+1);
                ss+=s[j]; 
                count=ss.length();
            }
               max=std::max(max,count);
        }
        return max;
    }
};
