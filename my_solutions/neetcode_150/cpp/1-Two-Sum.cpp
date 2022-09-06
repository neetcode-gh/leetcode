#include <bits/stdc++.h>

using namespace std;

class Solution
{
public:
    vector<int> twoSum(vector<int> &nums, int target)
    {
        vector<int> ans;
        unordered_map<int, int> visited;
        
        for (int i = 0; i < nums.size(); i++)
        {
            int key = target - nums[i];
            if (visited.find(key) != visited.end()) {
                ans.push_back(visited[key]);
                ans.push_back(i);
                return ans;
            } else {
                visited[nums[i]] = i;
            }

        }

        return ans;
    }
};

int main(int argc, char const *argv[])
{
    Solution sol;
    vector<int> v {2, 7, 11, 15};
    sol.twoSum(v, 9);
    return 0;
}