class Solution {
public:
    bool isAnagram(string s, string t) {
        map<char, int> firstMap;
        map<char, int> secondMap;
        for(auto item: s)
        {
            firstMap[item] += 1;
        }
        
        for(auto item: t)
        {
            secondMap[item] += 1;
        }
        
        if(firstMap == secondMap)
            return true;
        else
            return false;
    }
};