class Solution {
    public int[] twoSum(int[] numbers, int target) {
        
        int[] res = new int[2];
        Map<Integer, Integer> indexMap = new HashMap<>();

        for(int i = 0; i < numbers.length; i++){
            indexMap.put(numbers[i], i+1);
        }

        for(int i = 0; i < numbers.length; i++){
            int remain = target - numbers[i];
            if(indexMap.containsKey(remain)){
                res[0] = i+1;
                res[1] = indexMap.get(remain);
                return res;
            }
        }
        return res;  
    }
}
