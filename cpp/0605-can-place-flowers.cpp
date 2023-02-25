class Solution {
public:
    bool canPlaceFlowers(vector<int>& flowerbed, int n) {
        // pre-check, if n is 0 ... return true
        if(n == 0){
            return true;
        }
        
        // add a zero to the front and end of FB
        flowerbed.insert (flowerbed.begin(),0);
        flowerbed.push_back(0);

        // iterate through vector (1, vector -1) (for)
        //  if prev, curr, and next are 0
        //      plant flower (1)
        //      decrement n
        for(int i = 1; i < flowerbed.size() - 1; i++){
            if (flowerbed[i - 1] == 0 && flowerbed[i] == 0 && flowerbed[i+1] == 0){
                flowerbed[i] = 1;
                n--;
            }
            if (n == 0){
                return true;
            }

        }

        // return false as else
        return false;

    }
};
