package leetcode;

public class MinimumSizeSunArraySum {
    public static void main(String[] args) {
        int[] arr = {2,3,1,2,4,3};
        int target = 7;
        System.out.println(subArray(arr,target));
    }
    public  static int subArray(int[] arr , int target){
        int left = 0, right = 0, sum = 0 , n = arr.length;
        int result = Integer.MAX_VALUE;
        while (right < n){
            sum += arr[right];
            if(sum >= target){
                while (sum >= target){
                    sum -= arr[left];
                    left++;

                }
                 result = Math.min(result, right-left+2);
            }
             right++;
        }
          return result==Integer.MAX_VALUE?0:result;
    }
}
