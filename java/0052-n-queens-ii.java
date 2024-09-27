class Solution {
    int count = 0;

    public int totalNQueens(int n) {
        Set<Integer> colSet = new HashSet<>();
        Set<Integer> posDiagSet = new HashSet<>(); // (r + c)
        Set<Integer> negDiagSet = new HashSet<>(); // (r - c)
        backtrack(0, n, colSet, posDiagSet, negDiagSet);
        return count;
    }

    private void backtrack(
            int row,
            int n,
            Set<Integer> colSet,
            Set<Integer> posDiagSet,
            Set<Integer> negDiagSet) {
        if (row == n) {
            count += 1;
            return;
        }

        for (int col = 0; col < n; col++) {
            if (colSet.contains(col)
                    || posDiagSet.contains(row + col)
                    || negDiagSet.contains(row - col)) {
                continue;
            }
            colSet.add(col);
            posDiagSet.add(row + col);
            negDiagSet.add(row - col);
            backtrack(row + 1, n, colSet, posDiagSet, negDiagSet);
            colSet.remove(col);
            posDiagSet.remove(row + col);
            negDiagSet.remove(row - col);
        }
    }
}
