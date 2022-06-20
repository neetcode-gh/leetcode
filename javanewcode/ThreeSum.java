package leetcode;

import java.util.*;

public class ThreeSum {
    public static void main(String[] args) {
                int[] arr = {-1,0,1,2,-1,-4};
        System.out.println(threeSum(arr));
    }
    public static List<List<Integer>> threeSum(int[] nums) {
        int n = nums.length;
        Arrays.sort(nums);
        Set <List<Integer>> set = new HashSet<>();
        for(int i=0;i<n-1;i++){
            int j= i+1;
            int k = n-1;
            while(j<k){
                int sum = nums[i] + nums[j] + nums[k];
                if(sum ==0 ){
                    set.add(Arrays.asList(nums[i],nums[j],nums[k]));
                    j++;
                    k--;
                }else if(sum > 0){
                    k--;
                }else{
                    j++;
                }

            }
        }
        return new ArrayList(set);
    }
}
