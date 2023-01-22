public class Solution {
    public bool CanPlaceFlowers(int[] flowerbed, int n) {
        
        for(int i = 0; i < flowerbed.Length; i++){
            if(n == 0) return true;
            if((i == 0 || flowerbed[i - 1] == 0) && (flowerbed[i] == 0) && (i == flowerbed.Length - 1 || flowerbed[i + 1] == 0)){
                flowerbed[i] = 1;
                n--;
            }
        }
        return n == 0;
    }
}