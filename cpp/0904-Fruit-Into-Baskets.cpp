class Solution {
public:
    int totalFruit(vector<int>& fruits) {
        int n = fruits.size(), ans = 0;
        unordered_map<int, int> cnt;
        for (int r = 0, l = 0; r < n; ++r) {
            cnt[fruits[r]]++;
            while (cnt.size() > 2) {
                if (--cnt[fruits[l]] == 0)
                    cnt.erase(fruits[l]);
                ++l;
            }
            ans = max(ans, r - l + 1);
        }
        return ans;
    }
};
