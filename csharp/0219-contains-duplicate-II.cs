/*

Approach:
1. We will use a HashSet to store the elements.
2. We will iterate through the array and add the elements to the HashSet.
3. If the element is already present in the HashSet, we will return true.
4. If the difference between the current index and the previous index is greater than k, we will remove the element at the previous index.
5. If we reach the end of the array, we will return false.

Time Complexity: O(n)
Space Complexity: O(n)

*/
public class Solution {
    public bool ContainsNearbyDuplicate(int[] nums, int k) {
        HashSet<int> hs = new HashSet<int>();
        int i,j;
        i = j = 0;
        while(j<nums.Length) {
            if( Math.Abs(i-j) <= k) {
                if(!hs.Contains(nums[j])) {
                    hs.Add(nums[j]);
                    j++;
                }
                else {
                    return true;
                }
            }
            else {
                hs.Remove(nums[i]);
                i++;
            }
        }
        return false;
    }
}
