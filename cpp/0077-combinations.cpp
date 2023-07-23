class Solution {
public:
    vector<vector<int>> combine(int n, int k) {
        vector<int> curComb;
        vector<vector<int>> sumComb;
        backtrack(1, n, k, curComb, sumComb);
        return sumComb;
    }
private:
    void backtrack(int i, int n, int k, vector<int>& curComb, vector<vector<int>>& sumComb)
    {
        if (curComb.size() == k)
        {
            sumComb.push_back(curComb);
            return;
        }
        if (i > n)
            return;
        
        curComb.push_back(i);
        backtrack(i + 1, n, k, curComb, sumComb);

        curComb.pop_back();
        backtrack(i + 1, n, k, curComb, sumComb);
    }
};
