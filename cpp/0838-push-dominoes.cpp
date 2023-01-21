/*
    Time: O(n)
    Space: O(n)
*/

class Solution {
public:
    string pushDominoes(string dominoes) {
        
        string res = "";
        char prev;
        int n = dominoes.size(), count = 1;
        
        vector<int> left(n, 0), right(n, 0);
        for (int i = 0; i < n; i++) {
            if (dominoes[i] == 'R') { count = 1; prev = 'R'; }
            else if (dominoes[i] != '.')    prev = dominoes[i];
            if (prev == 'R' && dominoes[i] == '.')   right[i] = count++;
        }
        
        prev = '.';
        for (int i = n-1; i >= 0; i--) {
            if (dominoes[i] == 'L') { count = 1; prev = 'L'; }
            else if (dominoes[i] != '.')    prev = dominoes[i];
            if (prev == 'L' && dominoes[i] == '.')   left[i] = count++;
        }
        
        for (int i = 0; i < n; i++) {
            if (!left[i] && !right[i]) res += dominoes[i];
            else if (!left[i]) res += 'R';
            else if (!right[i]) res += 'L';
            else if (left[i] == right[i]) res += '.';
            else if (left[i] < right[i]) res += 'L';
            else res += 'R';
        }
        
        return res;
    }
};
