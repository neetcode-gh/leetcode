import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

class Solution {
    public boolean containsDuplicateBruteForce(int[] nums) {
        for (int i = 0; i < nums.length; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[i] == nums[j]) {
                    return true;
                }
            }
        }
        return false;
    }
    public boolean containsDuplicateSort(int[] nums) {
        Arrays.sort(nums);
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] == nums[i-1]) {
                return true;
            }
        }
        return false;
    }
    public boolean containsDuplicateSet(int[] nums) {
        Set<Integer> set = new HashSet<>();
        for (int num : nums) {
            if (set.contains(num)) {
                return true;
            }
            set.add(num);
        }
        return false;
    }
}

/*
Brute Force (TLE): Simply do a nested loops and do a linear search to find the duplicate element
Time: O(n), Space: O(1)

Sorting: Sort the array, start the loop at index 1 and compare it with the previous element. Return true if they are duplicate
Time: O(n log n), Space: depends on sorting implementation O(1)

HashSet: Create a HashSet and add the element to it. As it implements the Set Interface, duplicate values are not allowed. Return true if the element is already in the HashSet
Time and Space: O(n)
*/