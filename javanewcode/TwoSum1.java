package leetcode;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class TwoSum1 {
    public static void main(String[] args) {
               int[] nums = {2,7,11,15};
                int target = 9;
        System.out.println(twoSum(nums,target ));
    }
      public static int[] twoSum(int[] nums , int target){
          Map<Integer,Integer> map = new HashMap<>();
          for(int i =0;i<nums.length;i++){
              int comp = target- nums[i];
              if(map.containsKey(comp)){
                  return new int[]{i,map.get(comp)};
              }else{
                  map.put(nums[i],i);
              }
          }
          return null;
      }
}
