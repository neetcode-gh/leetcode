package com.khan.vaquar.easy01;

import java.util.Arrays;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Given an integer array nums and an integer k, return the k most frequent
 * elements. You may return the answer in any order. Input: nums =
 * [1,1,1,2,2,3], k = 2 Output: [1,2] Example 2:
 * 
 * Input: nums = [1], k = 1 Output: [1]
 * 
 * 
 * Constraints:
 * 
 * 1 <= nums.length <= 105 k is in the range [1, the number of unique elements
 * in the array]. It is guaranteed that the answer is unique.
 * 
 * [4,1,-1,2,-1,2,3]
 * k=2
 * 
 * @author vaquar
 *
 */
public class TopK {

	public static void main(String[] args) {
		int[] nums = {1,1,1,2,2,3};
				//{ 4,1,-1,2,-1,2,3 };
		int k = 2;
		topKFrequent(nums, k);
	}

	public static int[] topKFrequent(int[] nums, int k) {

		if (nums.length == 0) {
			return nums;
		}
		Arrays.sort(nums);
		Map<Integer, Integer> map = new HashMap<Integer, Integer>();
		//

		for (int i = 0; i < nums.length; i++) {
			if (map.containsKey(nums[i])) {
				int count = map.get(nums[i]);
				map.put(nums[i],++count);
			} else {
				map.put(nums[i], 1);
			}
		}
		
		 // Iterating HashMap through for loop
        //for (Entry<Integer, Integer> set :  map.entrySet()) {
            // Printing all elements of a Map
            //System.out.println(set.getKey() + " = " + set.getValue());
        //}
        
		List<Integer> sortedEntrysetList= map.entrySet().stream()
		            .sorted(Map.Entry.comparingByValue(Comparator.reverseOrder()))
		            .map(Map.Entry::getKey)
		            .collect(Collectors.toList());
		
		
		List<Integer> sublist = sortedEntrysetList.subList(0, k);

		int [] result =new int[sublist.size()];
		//
		for (int i = 0; i < sublist.size(); i++) {
			result[i] = sublist.get(i);
		}
		
		return result;

	}
}