class Solution {
    public int findContentChildren(int[] g, int[] s) {
        Arrays.sort(g);
        Arrays.sort(s);

        int i = 0, j = 0;
        while(i < g.length){
            while(j < s.length && g[i] > s[j])
                j += 1;
            if(j == s.length)
                break;
            i += 1;
            j += 1;        
        }
        return i;
    }
}
