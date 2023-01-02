class Solution {
public:
    int maxNumberOfBalloons(string text) {
        map<char, int> countText;
        map<char, int> balloon;
        for(char c: text)
            countText[c]++;
        for(char c: std::string("balloon"))
            balloon[c]++;
        
        int res = text.length();
        for(const auto &[key, value]: balloon)
            res = min(res, countText[key] / value);
        return res;
    }
};
