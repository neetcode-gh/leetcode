class Solution {
    public int arrangeCoins(int n) {
        
        int completedRows = 0;
        long left = 1;
        long right = n;
        while (left <= right) {

            int mid = (int) ((left + right) / 2);
            long coins = (long) ((mid / 2.0) * (mid + 1));
            if (coins > n) {
                right = mid - 1;
            } else {
                completedRows = Math.max(completedRows, mid);
                left = mid + 1;
            }
            
        }

        return completedRows;
    }
}