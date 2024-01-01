class Solution {
    public List<String> buildArray(int[] target, int n) {
        List<String> res = new ArrayList<>();
        int idx = 0;
        for(int i = 1; i <= n && idx < target.length; i++){
            res.add("Push");
            if(target[idx++] != i){
                res.add("Pop");
                idx--;
            }
        }
        return res;
    }
}
