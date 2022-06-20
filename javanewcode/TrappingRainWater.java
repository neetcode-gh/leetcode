package leetcode;

public class TrappingRainWater {
    public static void main(String[] args) {
          int[] arr = {4,0,2,0,5,0,4};
        System.out.println(rainWater(arr));

    }
      public static int rainWater(int[] arr){
        int ans = 0;
        int n = arr.length , left = 0,right = n-1 , leftbar = arr[0] , rightbar = arr[n-1];
        while (left <= right){
            if(leftbar<rightbar){
                if(arr[left] > leftbar){
                    leftbar = arr[left];
                }else{
                    ans += leftbar - arr[left];
                    left++;
                }
            }else{
                if(arr[right] > rightbar){
                    rightbar = arr[right];
                }else{
                    ans += rightbar - arr[right];
                    right--;
                }
            }
        }
           return ans;
      }
}
