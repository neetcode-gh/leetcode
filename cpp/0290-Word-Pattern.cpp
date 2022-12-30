class Solution {
public:
    bool wordPattern(string pattern, string s) {
        stringstream ss(s);
        vector<string> sWords;
        string word;
        while(ss >> word){
            sWords.push_back(word);
        }

        if(pattern.size() != sWords.size()){
            return false;
        }

        unordered_map<char, string> patternMap;
        unordered_map<string, char> sMap;

        for(int i = 0; i < pattern.size(); i++){
            if(patternMap.count(pattern[i]) && patternMap[pattern[i]] != sWords[i]){
                return false;
            }
            if(sMap.count(sWords[i]) && sMap[sWords[i]] != pattern[i]){
                return false;
            }
          
            patternMap[pattern[i]] = sWords[i];
            sMap[sWords[i]] = pattern[i];
        }

        return true;
    }
};
