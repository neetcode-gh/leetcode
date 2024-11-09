class Solution {

    private int[][] grid;

    public Node construct(int[][] grid) {
        this.grid = grid;
        return dfs(0, 0, grid.length);
    }

    private Node dfs(int row, int column, int n) {
        Node node = new Node();

        if (areAllEqual(row, column, n)) {
            node.isLeaf = true;
            node.val = grid[row][column] == 1;
        } else {
            n /= 2;
            node.isLeaf = false;
            node.val = false;

            node.topLeft = dfs(row, column, n);
            node.bottomLeft = dfs(row + n, column, n);
            node.topRight = dfs(row, column + n, n);
            node.bottomRight = dfs(row + n, column + n, n);
        }

        return node;
    }

    private boolean areAllEqual(int row, int column, int n) {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[row][column] != grid[row + i][column + j]) {
                    return false;
                }
            }
        }

        return true;
    }

}
