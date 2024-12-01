class Solution {
    public int snakesAndLadders(int[][] board) {
        int n = board.length;

        reverseBoard(board);

        boolean[] visited = new boolean[n*n+1];
        Queue<int[]> q = new LinkedList<>();
        q.offer(new int[]{1, 0});
        visited[1] = true;

        while(!q.isEmpty()) {
            int[] curr = q.poll();
            for(int j=1; j<=6; j++) {
                int next = curr[0] + j;
                int[] coor = squareToCoor(next, n);
                if(board[coor[0]][coor[1]] != -1) {
                    next = board[coor[0]][coor[1]];
                }
                if(next == n*n) {
                    return curr[1] + 1;
                }
                if(!visited[next]) {
                    visited[next] = true;
                    q.offer(new int[]{next, curr[1] + 1});
                }
            }
        }

        return -1;
    }

    public int[] squareToCoor(int square, int n) {
        int row = (square - 1) / n;
        int col = (square - 1) % n;
        if(row % 2 != 0) {
            col = n - 1 - col;
        }
        return new int[]{row, col};
    }

    public void reverseBoard(int[][] board) {
        int l = 0, r = board.length-1;
        while(l < r) {
            int[] temp = board[l];
            board[l] = board[r];
            board[r] = temp;
            l++;
            r--;
        }
    }
}