package leetcode;

public class RemoveDuplicatesfromSortedArrayII {
    public static void main(String[] args) {
         int[] arr = {1,1,1,2,2,3};
        System.out.println(removeDuplicate(arr));
    }
    static int removeDuplicate(int[] arr){
        int i = 0;
       for(int k=0 ; k < arr.length ; k++){
           if(i==0 || i == 1 || arr[i-2] != arr[k]){
               arr[i] = arr[k];
               i+=1;
           }
       }
             return i;
    }
}
