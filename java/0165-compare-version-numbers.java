class Solution {
    public int compareVersion(String version1, String version2) {
        String[] v1 = version1.split("\\.");
        String[] v2 = version2.split("\\.");

        int len = Math.max(v1.length, v2.length);
        for(int i = 0; i < len; i++){
            int v_1 = 0, v_2 = 0;
            if (i < v1.length)
                v_1 = Integer.parseInt(v1[i]);
            if(i < v2.length)
                v_2 = Integer.parseInt(v2[i]);

            if (v_1 < v_2)
                return -1;
            else if (v_1 > v_2) {
                return 1;
            }
        }
        return 0;
    }
}
