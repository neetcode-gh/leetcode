class Solution {
    public int maximumElementAfterDecrementingAndRearranging(int[] arr) {
        Arrays.sort(arr);
        int prev = 0;
        for(int n: arr)
            prev = Math.min(prev + 1, n);
        return prev;    
    }
}
