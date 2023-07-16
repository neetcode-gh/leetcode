class Solution {
private:
    bool isVowel(char ch)
    {
        if(ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u')
            return true;
        
        return false;
    }

public:
    int maxVowels(string str, int k)
    {
        int ans=0, count=0;

        for(int i = 0; i < k; i++)
        {
            if(isVowel(str[i]))
                count++;
        }

        ans = count;

        for(int i = k; i < str.size(); i++)
        {
            if(isVowel(str[i]))
                count++;
            if(isVowel(str[i-k]))
                count--;

            ans = max(ans, count);
        }

        return ans;
    }
};