package leetcode;

public class ContainerWithMostWater {
    public static void main(String[] args) {
       int[] arr = {1,8,6,2,5,4,8,3,7};
        System.out.println(MostWater(arr));
    }
    public static int MostWater(int[] arr){
        int ans = 0;
        int left = 0;
        int right = arr.length -1;

        while(left <= right){
            ans = Math.max(Math.min(arr[left],arr[right])*(right-left),ans);

            if(arr[left] < arr[right]){
                left++;
            }else {
                right--;
            }
        }
                return ans;
    }
}
