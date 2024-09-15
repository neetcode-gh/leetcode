class Solution {
    public int findTheLongestSubstring(String s) {
        char[] char_mask = {1,0,0,0,2,0,0,0,4,0,0,0,0,0,8,0,0,0,0,0,16,0,0,0,0,0};
        int crr_mask = 0, res = 0;
        int[] mask_map = new int[32];
        Arrays.fill(mask_map, -1);

        for(int i = 0; i < s.length(); i++){
            crr_mask ^= char_mask[s.charAt(i) - 'a'];
            if(crr_mask != 0 && mask_map[crr_mask] == -1){
                mask_map[crr_mask] = i;
            }
            res = Math.max(res, i - mask_map[crr_mask]);
        }

        return res;
    }
}
