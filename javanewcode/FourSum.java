package leetcode;

import java.util.*;

public class FourSum {
    public static void main(String[] args) {
              int[] arr = {1,0,-1,0,-2,2};
              int target = 0;
        System.out.println(fourSum(arr,target));
    }
    public static List<List<Integer>> fourSum(int[] arr, int target){
        Arrays.sort(arr);
        Set<List<Integer>> set  = new HashSet<>();
           for(int i=0;i<arr.length-3;i++){
               for(int j = i+1; j<arr.length-2;j++){
                   int start = j+1;
                   int end = arr.length-1;
                   while (start  < end){
                       int sum = arr[i] + arr[j] + arr[start] + arr[end];

                       if(sum == target){
                           set.add(Arrays.asList(arr[i],arr[j],arr[start],arr[end]));
                           start++;
                           end--;
                       }
                     else if(sum > target ) end--;
                       else start++;
                   }
               }
           }
                  return new ArrayList<>(set);
    }
}
