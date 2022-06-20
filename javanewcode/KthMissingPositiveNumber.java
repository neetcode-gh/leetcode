package leetcode;

public class KthMissingPositiveNumber {
    public static void main(String[] args) {
        int[] arr = {2,3,4,7,11};
        int k = 5;
        System.out.println(findKthPositive(arr,k));
    }
    public static int findKthPositive(int[] arr, int k) {
        if(arr[0] > k){
            return k;
        }
        int num = k;
        for(int a : arr){
            if(a <= num){
                num++;
            }
            else{
                break;
            }
        }
        return num;
    }
}
