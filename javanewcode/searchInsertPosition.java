package leetcode;
//https://leetcode.com/problems/search-insert-position/
public class searchInsertPosition {
    public static void main(String[] args) {
        int[] arr= {1,3,5,7};
        int target = 5;
        System.out.println(search(arr,target));
    }
       public static int search(int[] arr , int target){
        int start = 0;
        int end = arr.length - 1;
        while (start <=end){
            int mid  = start + (end-start)/2;
            if(arr[mid] == target){
                return mid;
             } else if(target > arr[mid]){
                start = mid + 1;
            }else{
                end = mid - 1;
            }

        }
        start = end + 1;
               return start;
       }
}
