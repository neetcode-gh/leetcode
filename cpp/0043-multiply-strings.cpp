/*
    Given 2 ints represented as strings, return product, also represented as a string
    Ex. num1 = "2" num2 = "3" -> "6", num1 = "123" num2 = "456" -> "56088"

    Standard multiplication, right to left per digit, compute sums & carries at each pos

    Time: O(m x n)
    Space: O(m + n)
*/

class Solution {
public:
    string multiply(string num1, string num2) {
        int m = num1.size();
        int n = num2.size();
        
        string result(m + n, '0');
        
        for (int i = m - 1; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                int sum = (num1[i] - '0') * (num2[j] - '0') + (result[i + j + 1] - '0');
                result[i + j + 1] = sum % 10 + '0';
                result[i + j] += sum / 10;
            }
        }
        
        for (int i = 0; i < m + n; i++) {
            if (result[i] != '0') {
                return result.substr(i);
            }
        }
        return "0";
    }
};
