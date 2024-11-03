class Solution {
    public int[] sortArrayByParity(int[] nums) {
        int[] arr = new int[nums.length];
        int i = 0;
        int j = nums.length-1;
        for(int n : nums){
            if(n%2 == 0){
                arr[i] = n;
                i++;
            }
            else{
                arr[j] = n;
                j--;
            }

        }
        return arr;
    }
}
