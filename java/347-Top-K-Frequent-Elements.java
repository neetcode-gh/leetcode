class Solution {
    public int[] topKFrequent(int[] nums, int k) {

        Map<Integer, Integer> map = new HashMap<>();

		//Maintain Count
        for(int num : nums){ 
            map.put(num, map.getOrDefault(num, 0) + 1); 
        }
        
        Queue<Integer> heap = new PriorityQueue<>((a, b) -> map.get(b) - map.get(a));
        
		// Add keys as PQ aka heap sort based on values
        for(int key : map.keySet()){ 
            heap.add(key); 
        }
        
        int[] ans = new int[k];

		// return top k elements
        for(int i = 0; i < k; i++){
            ans[i] = (heap.poll());
        }
        
        return ans;
    }
}