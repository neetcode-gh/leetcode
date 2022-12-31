/*
Given an integer array flowerbed containing 0's and 1's, where 0 means empty and 1 means not
empty, and an integer n, return if n new flowers can be planted in the flowerbed without
violating the no-adjacent-flowers rule.

Space: O(1)
Time: O(n)
*/

bool canPlaceFlowers(int* flowerbed, int flowerbedSize, int n){
    int cpt = 0; // Count the number of flowers that can be added
    int i=0;
    while (i<flowerbedSize) {
        if ((i+1)==flowerbedSize) { // To avoid 'index out of range'
            if (flowerbed[i]==0) {
                cpt++;
            }
            i++;
        } else if (flowerbed[i]==0) {
            if (flowerbed[i+1]==0) {
                cpt++;
                i += 2;
            } else {
                i += 3;
            }
        } else {
            i += 2;
        }
    }
    return cpt>=n;
}
