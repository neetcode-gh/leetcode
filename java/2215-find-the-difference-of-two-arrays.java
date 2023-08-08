class Solution {
    public List<List<Integer>> findDifference(int[] nums1, int[] nums2) {
        List<List<Integer>> res = new ArrayList<>();

        List<Integer> num1 = new ArrayList<>();
        for(int n: nums1) num1.add(n);

        List<Integer> num2 = new ArrayList<>();
        for(int n: nums2) num2.add(n);

        Set<Integer> set1 = new HashSet<>();
        Set<Integer> set2 = new HashSet<>();

        //Because we need to return result in 2 list of the result list, therefore we are creating these placeholders
        res.add(new ArrayList<>()); 
        res.add(new ArrayList<>());

        for(int i=0; i<nums1.length; i++){
            if(!num2.contains(nums1[i])) set1.add(nums1[i]);
        }

        for(int i=0; i<nums2.length; i++){
            if(!num1.contains(nums2[i])) set2.add(nums2[i]);
        }

        for(int n: set1) res.get(0).add(n);

        for(int n: set2) res.get(1).add(n);

        return res;
    }
}
