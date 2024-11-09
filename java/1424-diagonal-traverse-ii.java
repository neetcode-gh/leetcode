class Solution {
    public int[] findDiagonalOrder(List<List<Integer>> nums) {
        Map<Integer, List<Integer>> map = new HashMap<>();
        int n = 0;
        for(int i = nums.size()-1; i >= 0; i--){
            for(int j = 0; j < nums.get(i).size(); j++){
                n++;
                if(!map.containsKey(i+j)){
                    map.put(i+j, new ArrayList<>());
                }
                map.get(i+j).add(nums.get(i).get(j));
            }
        }
        int[] res = new int[n];
        int idx = 0;
        int curr = 0;
        while(map.containsKey(curr)){
            for(int num: map.get(curr)){
                res[idx] = num;
                idx++;
            }
            curr++;
        }
        return res;
    }
}
