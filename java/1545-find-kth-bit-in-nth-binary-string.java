/*----------------------------
  Time Complexity: O(n)
  Space Complexity: O(n)
-----------------------------*/  

class Solution {
    public char findKthBit(int n, int k) {
        int length = (int)Math.pow(2, n) - 1;

        return helper(length, k);
    }

    private char helper(int length, int k){
        if(length == 1)
            return '0';

        int half = length/2;

        if(k <= half){
            return helper(half, k);
        } 
        else if(k > half + 1){
            char res = helper(half, 1 + length - k);
            return (res == '0')? '1': '0';
        }
        else{
            return '1';
        }
    }
}
