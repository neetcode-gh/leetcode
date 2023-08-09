class Solution {
    public int minimizeMax(int[] nums, int p) {
        Arrays.sort(nums);

        int s = 0;
        int e = nums[nums.length -1];
        int res = Integer.MAX_VALUE;

        while(s <= e) {
            int mid = s + (e-s)/2;

            if(isPossible(nums, mid, p)) {
                res = mid;
                e = mid - 1;
            } else {
                s = mid + 1;
            }
        }

        return res;
    }

    public boolean isPossible(int[] arr, int maxDiff, int pairs) {
        int count = 0;
        int i = 0;

        while(i < arr.length - 1) {
            if(Math.abs(arr[i] - arr[i+1]) <= maxDiff) {
                count++;
                i += 2;
            } else {
                i++;
            }
        }

        return count >= pairs;
    }
}
