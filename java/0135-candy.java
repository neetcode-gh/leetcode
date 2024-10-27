class Solution {
    public int candy(int[] ratings) {
        int[] candies = new int[ratings.length];
        Arrays.fill(candies, 1);

        for(int i = 1; i < ratings.length; i++){
            if(ratings[i-1] < ratings[i])
                candies[i] = candies[i-1] + 1;
        }
        for(int i = ratings.length-2; i >= 0; i--){
            if(ratings[i+1] < ratings[i])
                candies[i] = Math.max(candies[i], candies[i+1] + 1);
        }
        int res = 0;
        for(int n : candies)
            res += n;

        return res;    
    }
}
