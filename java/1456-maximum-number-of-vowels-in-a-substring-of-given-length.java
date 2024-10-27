class Solution {
    public int maxVowels(String s, int k) {
        Set<Character> set = new HashSet<>();
        Collections.addAll(set, 'a', 'e', 'i', 'o', 'u');

        int l=0, cnt=0, res=0;

        for(int r=0; r<s.length(); r++){
            cnt += set.contains(s.charAt(r))?1:0;
            if(r-l+1 > k){
                cnt -= set.contains(s.charAt(l))?1:0;
                l++;
            }
            res = Math.max(res, cnt);
        }
        return res;
    }
}
