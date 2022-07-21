class Solution {

    public String tictactoe(int[][] moves) {
        int[][][] result = new int[2][2][3];
        int[][] diag1 = new int[2][1];
        int[][] diag2 = new int[2][1];

        int p = 0;
        for (int i = 0; i < moves.length; i++) {
            int r = moves[i][0];
            int c = moves[i][1];

            if (++result[p][0][r] == 3) return getWinner(p);
            if (++result[p][1][c] == 3) return getWinner(p);

            if (r == c) if (++diag1[p][0] == 3) return getWinner(p);

            if (
                (r == 1 && c == 1) || (r == 0 && c == 2) || (r == 2 && c == 0)
            ) if (++diag2[p][0] == 3) return getWinner(p);

            if (p == 0) p = 1; else p = 0;
        }

        return moves.length == 9 ? "Draw" : "Pending";
    }

    private String getWinner(int p) {
        return p == 0 ? "A" : "B";
    }
}
