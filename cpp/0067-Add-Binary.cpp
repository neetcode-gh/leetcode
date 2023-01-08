class Solution {
public:
    string addBinary(string a, string b) {
        string res;
        int maxLen = a.size() > b.size() ? a.size() : b.size();
        unsigned int carry = 0;

        for(int i = 0; i < maxLen; i++)
        {
            unsigned int bitA = i < a.size() ? a[a.size() - i - 1] - '0' : 0;
            unsigned int bitB = i < b.size() ? b[b.size() - i - 1] - '0' : 0;

            unsigned int total = bitA + bitB + carry;
            char sum = '0' + total % 2;
            carry = total / 2;

            // Add to the beginning of the string
            res.insert(0, 1, sum);
        }

        if(carry)
        {
            res.insert(0, 1, '1');
        }

        return res;
    }
};
