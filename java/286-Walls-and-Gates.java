//Same as rotting oranges
//Time complexity will be O(N^2) since we are basically traversing every value in the grid.

class Solution {
    public void wallsAndGates(int[][] rooms) {
        Queue<int[]> q = new LinkedList<>();
        int m = rooms.length; 
        int n = rooms[0].length;
        for (int i=0; i<m; i++) {
            for (int j=0; j<n; j++) {
                if (rooms[i][j]==0) 
                    q.add(new int[]{i, j});
            }
        }
        if (q.size()==0)
            return;
        int[][] dirs = {{-1,0}, {0,-1}, {1,0}, {0,1}};
        int dis = 0;
        while (!q.isEmpty()) {
            ++dis;
            int[] cur = q.poll();
            int row = cur[0];
            int col = cur[1];
            for (int[] dir: dirs) {
                int x = row+dir[0];
                int y = col+dir[1];
                if (x>=m || y>=n || x<0 || y<0 || rooms[x][y]!=Integer.MAX_VALUE)
                    continue;
                q.add(new int[]{x, y});
                //since cur is basically the index of door (which is equal to 0)
                //So, we can just grab that value (rooms[row][col]) and add 1 to it and change it every time
                rooms[x][y] = rooms[row][col]+1;
                //So, one level further from door (value 0) is equal to 1. Now, we do bfs from that position so value will be 2 and so on.
            }
        }
    }
}
