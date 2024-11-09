class Solution {
    public int getLastMoment(int n, int[] left, int[] right) {
        Arrays.sort(left);
        Arrays.sort(right);
        if(left.length == 0 && right.length != 0)
            return n-right[0];
        if(left.length != 0 && right.length == 0)
            return left[left.length-1];    
            
        return (int)Math.max(n-right[0], left[left.length-1]);
    }
}
