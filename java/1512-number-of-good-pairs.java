/*    Brute Force (Method 1)
-----------------------------
  Time Complexity: O(n^2)
  Space Complexity: O(1)
----------------------------*/
class Solution {
   public int numIdenticalPairs(int[] nums) {
        int i=0,j=0,c=0;     
        for(i=0;i<nums.length;i++){
            for(j=i+1;j<nums.length;j++){
                if(nums[i]==nums[j])
                    c++;;
            }
        }
        return c;
    }
}

/*   Combinations (Method 2)
---------------------------------
  Time Complexity: O(n)
  Space Complexity: O(n)
---------------------------------*/
class Solution {
    public int numIdenticalPairs(int[] nums) {
        Map<Integer, Integer> freq = new HashMap<>();
        for(int n: nums)
            freq.put(n, freq.getOrDefault(n, 0) + 1);
        int res = 0;
        for(int c : freq.values()){
            res += c*(c-1)/2;    // Combination formula nC2 = n*n(n-1)/2
        }
        return res;    
    }
}

/*         Method 3
----------------------------
  Time Complexity: O(n)
  Space Complexity: O(n)
---------------------------*/
class Solution {
    public int numIdenticalPairs(int[] nums) {
        int res = 0;
        Map<Integer, Integer> freq = new HashMap<>();
        for(int n : nums){
            if(freq.containsKey(n)){
                res += freq.get(n);
                freq.put(n, freq.get(n)+1);
            }
            else
                freq.put(n, 1);
        }
        return res;   
    }
}
