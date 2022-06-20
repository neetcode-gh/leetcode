package leetcode;

public class FindMinimuminRotatedSortedArrayII {
    public static void main(String[] args) {
             int[] arr = {4,5,6,7,0,1,2};
        System.out.println(findMin(arr));
    }

    public static int findMin(int[] arr){
        int start = 0;
        int end = arr.length-1;

        while (start < end){
            int mid = start + (end-start)/2;
            if(arr[mid] > arr[end]){
                start = mid + 1;
            }else if(arr[mid] < arr[end]){
                end = mid;
            }else if(arr[mid] == arr[end]){
                end--;
            }
        }
             return arr[start];
    }
}
