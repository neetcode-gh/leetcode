class Solution {
public:
    int strStr(string haystack, string needle) {
        if(haystack.size()<needle.size()) return -1;
        int found=0;
        for(int i=0;i<haystack.size()-needle.size()+1;i++){
            if(haystack[i]==needle[0]){
                found=1;
                for(int j=1;j<needle.size();j++){
                    if(haystack[i+j]!=needle[j]){
                        found=0;break;
                    }
                }if(found==1) return i;
            }
        }return -1;
    }
};
