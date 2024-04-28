/*-------------------------------
  Time Complexity: O(n)
  Space Complexity: O(1)
--------------------------------*/  
class Solution {
    public int minCost(String colors, int[] neededTime) {
        int res = 0, l = 0;

        for(int r = 1; r < colors.length(); r++){
            if(colors.charAt(l) == colors.charAt(r)){
                if(neededTime[l] < neededTime[r]){
                    res += neededTime[l];
                    l = r;
                }
                else
                    res += neededTime[r];
            }
            else
                l = r;
        }
        return res;
    }
}
