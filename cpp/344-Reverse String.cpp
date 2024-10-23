class Solution {
public:
    void reverseString(vector<char>& s) {
        int f=0;
        int l=s.size()-1;
        while(f<l){
            swap(s[f++],s[l--]);
        }
        
    }
};
