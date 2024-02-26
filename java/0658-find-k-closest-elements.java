// Time: O(log(N) + K)
// Space: O(1)
class Solution {
    public List<Integer> findClosestElements(int[] arr, int k, int x) {
        int leftIdx = binarySearch(arr, x), rightIdx = leftIdx + 1;
        List<Integer> result = new LinkedList<>();
        while (result.size() < k) {
            int absLeft = leftIdx >= 0 ? Math.abs(x - arr[leftIdx]) : Integer.MAX_VALUE;
            int absRight = rightIdx < arr.length ? Math.abs(x - arr[rightIdx]) : Integer.MAX_VALUE;
            if (absLeft <= absRight) result.add(0, arr[leftIdx--]);
            else result.add(arr[rightIdx++]);
        }
        return result;
    }

    private int binarySearch(int[] nums, int x) {
        int left = 0, right = nums.length;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] >= x) right = mid;
            else left = mid+1;
        }
        return left > 0 ? left - 1 : 0; 
    }
}

// Time: O(N)
// Space: O(1)
class Solution {
    public List<Integer> findClosestElements(int[] arr, int k, int x) {
        int n = arr.length, leftIdx = 0, rightIdx = n - 1;
        while (rightIdx - leftIdx + 1 > k) {
            if (Math.abs(x - arr[leftIdx]) <= Math.abs(x - arr[rightIdx])) rightIdx--; 
            else leftIdx++;
        }
        List<Integer> result = new LinkedList<>();
        for (int i = leftIdx; i <= rightIdx; ++i) result.add(arr[i]);
        return result; 
    }
}

