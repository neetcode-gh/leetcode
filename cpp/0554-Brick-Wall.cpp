class Solution {
public:
    int leastBricks(vector<vector<int>>& wall) {
        unordered_map<int, int> wallGapCount;   // <Position, Gap count>
        wallGapCount[0] = 0;    // To handle an edge case where this is no elements
        
        for(int r = 0; r < wall.size(); r++)
        {
            int position = 0;
            for(int b = 0; b < wall[r].size() - 1; b++)
            {
                position += wall[r][b];
                wallGapCount[position] += 1;
            }
        }

        return wall.size() - max_element(wallGapCount.begin(), wallGapCount.end(), &Solution::compare)->second; // Total number of rows - Max gap
    }

private:
    static bool compare(const pair<int, int>& a, const pair<int, int>& b)
    {
        return a.second < b.second;
    }

};
