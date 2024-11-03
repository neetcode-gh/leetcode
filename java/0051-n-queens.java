// Solution 1:
class Solution {

    public List<List<String>> solveNQueens(int n) {
        List<List<String>> ans = new ArrayList<List<String>>();
        boolean[][] board = new boolean[n][n];
        queens(board, 0, ans);
        return ans;
    }

    public void queens(boolean[][] board, int row, List<List<String>> ans2) {
        //base case
        if (row == board.length) {
            ArrayList<String> ans = new ArrayList<String>();
            createAnswer(board, ans);
            ans2.add(ans);
            return;
        }
        for (int col = 0; col < board.length; col++) {
            if (isSafe(board, row, col)) {
                board[row][col] = true;
                queens(board, row + 1, ans2);
                board[row][col] = false;
            }
        }
    }

    public void createAnswer(boolean[][] board, ArrayList<String> ans) {
        for (int i = 0; i < board.length; i++) {
            StringBuilder str = new StringBuilder();
            for (int j = 0; j < board[0].length; j++) {
                if (board[i][j]) {
                    str.append("Q");
                } else str.append(".");
            }
            ans.add(str.toString());
        }
    }

    public boolean isSafe(boolean[][] board, int row, int col) {
        for (int i = 0; i < row; i++) {
            if (board[i][col]) {
                return false;
            }
        }
        int maxLeft = Math.min(row, col);
        for (int i = 1; i <= maxLeft; i++) {
            if (board[row - i][col - i]) {
                return false;
            }
        }
        int maxRight = Math.min(row, board.length - 1 - col);
        for (int i = 1; i <= maxRight; i++) {
            if (board[row - i][col + i]) return false;
        }
        return true;
    }
}



// Solution 2:
/*
 * This solution uses 3 hashsets to check whether the current queen has conflicts with previous
 * columns and two diagonals, avoiding the use of 2D boolean array and the isSafe checking function.
 * 
 */
class Solution {
    public List<List<String>> solveNQueens(int n) {
        List<List<String>> result = new ArrayList<>();
        List<String> cur = new ArrayList<>();
        if (n <= 0) {
            return result;
        }
        Set<Integer> leftSet = new HashSet<>(); // diag \ row - col
        Set<Integer> rightSet = new HashSet<>(); // diag / row + col
        Set<Integer> colSet = new HashSet<>(); // column | col
        dfs(n, result, cur, leftSet, rightSet, colSet);
        return result;
    }

    private void dfs(int n, List<List<String>> result, List<String> cur, Set<Integer> leftSet,
            Set<Integer> rightSet, Set<Integer> colSet) {
        if (cur.size() == n) {
            result.add(new ArrayList(cur));
            return;
        }
        int row = cur.size();
        // i is column index
        for (int i = 0; i < n; i++) {
            if (leftSet.contains(row - i) || rightSet.contains(row + i) || colSet.contains(i)) {
                continue;
            }
            // current col index is added to the solution list cur
            cur.add(convert(n, i));
            leftSet.add(row - i);
            rightSet.add(row + i);
            colSet.add(i);
            // go to dfs next level
            dfs(n, result, cur, leftSet, rightSet, colSet);
            // backtracking
            cur.remove(cur.size() - 1);
            leftSet.remove(row - i);
            rightSet.remove(row + i);
            colSet.remove(i);

        }
    }

    private String convert(int n, int col) {
        StringBuilder res = new StringBuilder();
        for (int i = 0; i < n; i++) {
            if (i == col) {
                res.append("Q");
            } else {
                res.append(".");
            }
        }
        return res.toString();
    }
}





