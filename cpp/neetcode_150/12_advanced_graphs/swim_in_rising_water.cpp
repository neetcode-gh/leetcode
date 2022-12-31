/*
    Given an integer elevation matrix, rain falls, at time t, depth everywhere is t
    Can swim iff elevation at most t, return least time get from top left to bottom right

    Shortest path w/ min heap: at every step, find lowest water level to move forward

    Time: O(n^2 log n)
    Space: O(n^2)
*/

class Solution {
public:
    int swimInWater(vector<vector<int>>& grid) {
        int n = grid.size();
        vector<vector<bool>> visited(n, vector<bool>(n));
        priority_queue<vector<int>, vector<vector<int>>, greater<vector<int>>> q;

        visited[0][0] = true;
        q.push({grid[0][0], 0, 0});

        vector<vector<int>> dirs = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
        
        while (!q.empty()){
            int currR = q.top()[1];
            int currC = q.top()[2];
            int currT = q.top()[0];
            q.pop();

            if (currR == n - 1 && currC == n - 1)
                return currT;

            for (auto& dir : dirs){
                int newR = currR + dir[0];
                int newC = currC + dir[1];
                if (newR < 0 || newR == n || newC < 0 || newC == n || visited[newR][newC])
                    continue;
                visited[newR][newC] = true;
                q.push({max(currT, grid[newR][newC]), newR, newC});
            }
        }

        return -1;
    }
};
