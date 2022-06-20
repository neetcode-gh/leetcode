package leetcode;

public class RemoveElement {
    public static void main(String[] args) {
        int target = 3;
        int[] arr = {3,2,3,5};
        System.out.println(remove(arr,target));
    }
      static int remove(int[] arr , int val){
        int i =0;
        for(int j = 0; j < arr.length ; j++){
            if(arr[j] != val){
                arr[i] = arr[j];
                i++;
            }
        }
             return i;
      }
}
