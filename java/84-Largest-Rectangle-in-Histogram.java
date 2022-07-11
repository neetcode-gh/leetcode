class Solution {
    public int largestRectangleArea(int[] heights) {
        int n = heights.length;
        int[] leftMin = new int[n];
        Stack<Integer> left = new Stack<>();
        Arrays.fill(leftMin, -1);
        for (int i = heights.length-1; i>=0; i--) {
            if (left.isEmpty() || heights[i]>=heights[left.peek()]) {
                left.add(i);
            } else {
                while (!left.isEmpty() && heights[left.peek()]>heights[i]) {
                    leftMin[left.peek()] = i;
                    left.pop();
                }
                left.add(i);
            }
        }
        int[] rightMin = new int[n];
        Stack<Integer> right = new Stack<>();
        Arrays.fill(rightMin, heights.length);
        for (int i = 0; i<heights.length; i++) {
            if (right.isEmpty() || heights[i]>=heights[right.peek()]) {
                right.add(i);
            } else {
                while (!right.isEmpty() && heights[right.peek()]>heights[i]) {
                    rightMin[right.peek()] = i;
                    right.pop();
                }
                right.add(i);
            }
        }
        // System.out.println()
        int area = Integer.MIN_VALUE;
        for (int i = 0; i<heights.length; i++) {
            area = Math.max(area, heights[i]*(rightMin[i]-leftMin[i]-1));
        }
        return area;
    }
}
