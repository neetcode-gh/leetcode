class Solution {
    public int[] nextGreaterElement(int[] nums1, int[] nums2) {
        var map = new HashMap<Integer,Integer>();
        var stack = new ArrayDeque<Integer>();
        stack.push(nums2[0]);
        for(var i = 1; i < nums2.length; i++) {
            while(!stack.isEmpty() && stack.peek() < nums2[i]) map.put(stack.pop(), nums2[i]);
            stack.push(nums2[i]);
        }
        var i = 0;
        for(int n : nums1)
            nums1[i++] = map.getOrDefault(n, -1);
        return nums1;
    }
}