class Solution {
public:
    bool hasAllCodes(string s, int k) {
        
        set<string> all_substrings;
        int total = 1 <<k; // this is equal to 2 power k (2^k)

        // get all the substring of len k and store it in a set
        for(int i =0;i+k<=s.length();i++){
            all_substrings.insert(s.substr(i,k));
            // size of set equals 2 power k
            if (all_substrings.size() == total){
                return true;
            }
        }
        
        return false;
    }
};
