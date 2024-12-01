class Solution {
    public int[] successfulPairs(
        int[] spells, int[] potions, long success) {
        int [] res = new int[spells.length];
        Arrays.sort(potions);
        for(int i=0;i<spells.length;i++){
            int spell = spells[i];
            int l = 0, r = potions.length-1;
            while(l<=r){
                int m = l+(r-l)/2;
                if((long)spell*potions[m]>=success) r=m-1;
                else l=m+1;
            }
            res[i] = (l<potions.length)?potions.length-l:0;
        }
        return res;
    }
}
