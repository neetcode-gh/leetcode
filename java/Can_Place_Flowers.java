package com.coding.patterns.tree;

public class Can_Place_Flowers {
    public boolean canPlaceFlowers(int[] flowerbed, int n) {
        int len = flowerbed.length;
        int remaining = n;
        int i=0;
        if(remaining == 0)
            return true;
        while(i < len){
            if(flowerbed[i] == 1)
                i++;
            else{
                if(i!=0 && flowerbed[i-1] == 1)
                    i++;
                else if(i != len-1 && flowerbed[i+1] == 1)
                    i+=3;
                else {
                    flowerbed[i] = 1;
                    i+=2;
                    remaining--;
                }
                if(remaining == 0)
                    return true;
            }
        }
        if(remaining == 0)
            return true;
        return false;
    }
}
