class Solution {

    public List<Integer> spiralOrder(int[][] matrix) {
        List<Integer> list = new ArrayList<>();
        int rb = 0;
        int re = matrix.length - 1;
        int cb = 0;
        int ce = matrix[0].length - 1;

        while (rb <= re && cb <= ce) {
            for (int j = cb; j <= ce; j++) {
                list.add(matrix[rb][j]);
            }
            rb++;

            for (int i = rb; i <= re; i++) {
                list.add(matrix[i][ce]);
            }
            ce--;

            if (rb <= re) {
                for (int j = ce; j >= cb; j--) {
                    list.add(matrix[re][j]);
                }
            }
            re--;

            if (cb <= ce) {
                for (int i = re; i >= rb; i--) {
                    list.add(matrix[i][cb]);
                }
            }
            cb++;
        }

        return list;
    }
}
