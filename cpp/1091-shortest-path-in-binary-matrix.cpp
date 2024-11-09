class Solution {
public:
    int shortestPathBinaryMatrix(vector<vector<int>>& grid) {
        int n = grid.size();
        if(grid[0][0]==1 || grid[n-1][n-1]==1) return -1;

        // {{r,c},length}
        queue<pair<pair<int,int>,int>> q;
        set<pair<int,int>> visited;

        q.push({{0,0},0});
        visited.insert(make_pair(0,0));

        int drow[] = {0,1,0,-1,1,-1,1,-1};
        int dcol[] = {1,0,-1,0,1,-1,-1,1};

        while(!q.empty()){
            int row = q.front().first.first;
            int col = q.front().first.second;
            int len = q.front().second;

            if(row == n-1 && col == n-1){
                return len+1;
            }

            for(int i=0; i<8; i++){
                int nrow = row + drow[i];
                int ncol = col + dcol[i];

                if(nrow>=0 && nrow<n && ncol>=0 && ncol<n && visited.find({nrow,ncol})==visited.end() && grid[nrow][ncol]==0){
                    q.push({{nrow,ncol},len+1});
                    visited.insert(make_pair(nrow,ncol));
                }
            }
            q.pop(); 
        }
        return -1;
    }
};