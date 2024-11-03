// Time: O(N * logN)
// Space: O(N)

class Solution {
public:
    vector<int> successfulPairs(vector<int>& spells, vector<int>& potions, long long success) {
        sort(potions.begin(), potions.end());

        int n = spells.size();
        int m = potions.size();
        vector<int> pairs(n);

        for(int i = 0; i < n; i++) {
            int spell = spells[i];

            int start = 0, end = m - 1;
            int curr;

            while(start <= end) {
                curr = start + (end-start)/2;
                long long strength = (long long)potions[curr] * (long long)spell;
                if(strength < success) {
                    start = curr + 1;
                }
                else {
                    end = curr - 1;
                }
            }
            pairs[i] = m - start;
        }

        return pairs;
    }
};
