/*----------------------------------
  Time Complexity: O(n)
  Space Complexity: O(1)
-----------------------------------*/

class Solution {
    public int garbageCollection(String[] garbage, int[] travel) {
        int[] idx = new int[3];
        int res = 0;
        for(int i = 0; i < garbage.length; i++){
            res += garbage[i].length();
            if(garbage[i].contains("G"))
                idx[0] = i;
            if(garbage[i].contains("P"))
                idx[1] = i; 
            if(garbage[i].contains("M"))
                idx[2] = i;       
        }
        for(int i: idx){
            for(int j = 0; j < i; j++){
                res += travel[j];
            }
        }
        return res;
    }
}
