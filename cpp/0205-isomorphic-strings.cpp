/*Given two strings s and t, determine if they are isomorphic.

Two strings s and t are isomorphic if the characters in s can be replaced to get t.

All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.

 */
class Solution {
public:
    bool isIsomorphic(string s, string t) {
       unordered_map<char,vector<int>>m1;
         unordered_map<char,vector<int>>m2;
        for(int i=0;i<s.length();i++){
            m1[s[i]].push_back(i);
             m2[t[i]].push_back(i);
            
            if(m1[s[i]]!=m2[t[i]])
                return false;
        }
        return true;
        
    }
};
