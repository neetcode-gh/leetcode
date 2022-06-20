package leetcode;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class ContainsDuplicateII219 {
    public static void main(String[] args) {
           int[] arr = {1,2,3,1};
           int k = 3;
        System.out.println(duplicate(arr,k));
    }

    public static boolean duplicate(int[] arr , int k) {
        Set<Integer> set = new HashSet<>();
        for(int i=0;i<arr.length;i++){
            if(!set.add(arr[i])){
                return true;
            }

            if(set.size() > k){
                set.remove(arr[i-k]);
            }
        }

                return false;
    }
}
