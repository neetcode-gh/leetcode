public class Solution {
    public int[] ReplaceElements(int[] arr) {
        int max = -1;
        for(int i = arr.Length-1; i >= 0; i--) {
            int newMax = Math.Max(arr[i], max);
            arr[i] = max;
            max = newMax;
        }
        return arr;
    }
}