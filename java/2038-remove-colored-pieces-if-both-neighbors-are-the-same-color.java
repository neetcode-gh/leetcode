/*--------------------------
  Time Complexity : O(n)
  Space Complexity : O(1)
----------------------------*/  

class Solution {
    public boolean winnerOfGame(String colors) {
        int alice = 0, bob = 0;
        for(int i = 1; i < colors.length()-1; i++){
            if(colors.charAt(i) == 'A' && colors.charAt(i-1) == 'A' && colors.charAt(i+1) == 'A'){
                alice++;
            }
            else if(colors.charAt(i) == 'B' && colors.charAt(i-1) == 'B' && colors.charAt(i+1) == 'B'){
                bob++;
            }
        }
        return (alice > bob);
    }
}
