package leetcode;

public class SingleNumber {
    public static void main(String[] args) {
               int[] arr = {4,1,2,1,2};
        System.out.println(single(arr));
    }
    static int single(int[] arr){
        int ans = 0;
        for(int i=0;i<arr.length;i++){
                   ans ^= arr[i];
        }
           return ans;
    }
}
