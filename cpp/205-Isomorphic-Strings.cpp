class Solution {
public:
    bool isIsomorphic(string s, string t) {
        unordered_map<char, char> STMap, TSMap;

        for(size_t i = 0; i < s.size(); i++)
        {
            // (STMap[s[i]] != 0) ===> If the char is not in the map
            if((STMap[s[i]] != 0 && STMap[s[i]] != t[i]) || (TSMap[t[i]] != 0 && TSMap[t[i]] != s[i]))
            {
                return false;
            }

            STMap[s[i]] = t[i];
            TSMap[t[i]] = s[i];
        }

        return true;
    }
};
