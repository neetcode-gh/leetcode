class Solution {
    public List<Boolean> checkArithmeticSubarrays(int[] nums, int[] l, int[] r) {
        List<Boolean> res = new ArrayList<>();

        for(int i = 0; i < l.length; i++){
            int[] subArray = Arrays.copyOfRange(nums, l[i], r[i]+1);
            Arrays.sort(subArray);
            int diff = subArray[1] - subArray[0];
            boolean isArithmatic = true;
            for(int j = 1; j < subArray.length; j++){
                if(subArray[j] - subArray[j-1] != diff){
                    isArithmatic = false;
                    break;
                }
            }
            res.add(isArithmatic);
        }
        return res;
    }
}
