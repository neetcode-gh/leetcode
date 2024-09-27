/*-------------------------------
  Time Complexity : O(n^3)
  Space Complexity : O(1)
-------------------------------*/
class Solution {
    public int countTriplets(int[] arr) {
        int res = 0;
        
        for(int i = 0; i < arr.length - 1; i++){
            int a = 0;
            for(int j = i + 1; j < arr.length; j++){
                a ^= arr[j - 1];
                int b = 0;
                for(int k = j; k < arr.length; k++){
                    b ^= arr[k];
                    if(a == b)
                        res += 1;
                }
            }
        }
        return res;
    }
}

/*-------------------------------
  Time Complexity : O(n^2)
  Space Complexity : O(1)
-------------------------------*/
class Solution {
    public int countTriplets(int[] arr) {
        int res = 0;
        
        for(int i = 0; i < arr.length - 1; i++){
            int cur_xor = arr[i];
            for(int k = i + 1; k < arr.length; k++){
                cur_xor ^= arr[k];
                if(cur_xor == 0)
                    res += k - i;
            }
        }
        return res;
    }
}
