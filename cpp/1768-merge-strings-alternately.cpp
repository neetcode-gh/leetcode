class Solution {
public:
    string mergeAlternately(string word1, string word2)
    {
        int i=0;
        string final="";

        while(i < word1.size() && i < word2.size())
            final = final + word1[i] + word2[i++];

        while(i < word1.size())
            final += word1[i++];
        while(i < word2.size())
            final += word2[i++];

        return final;
    }
};