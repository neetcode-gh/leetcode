class Solution {
private:
    void backtrack(int start, int n, int k, vector<int> &combination, vector<vector<int>> &res){
            //base case, when size of combination is k, we wanna stop
            if(combination.size() == k){
                res.push_back(combination);
                return;
            }

            for(int i = start; i<=n; i++){
                combination.push_back(i);
                backtrack(i+1, n, k, combination, res);
                combination.pop_back();
            }
        }
public:
    vector<vector<int>> combine(int n, int k) {
        vector<vector<int>> res;

        //initial empty list to pass to the backtrack function
        vector<int> emptyCombination;

        backtrack(1, n, k, emptyCombination, res);

        return res;
    }
};