/*------------------------------
  Time Complexity: O(n)
  Space Complexity: O(1)
-------------------------------*/ 
class Solution {
    public int buyChoco(int[] prices, int money) {
        int min1 = Integer.MAX_VALUE, min2 = Integer.MAX_VALUE;

        for(int p: prices){
            if(p < min2){
                if(p < min1){
                    min2 = min1;
                    min1 = p;
                }
                else
                    min2 = p;
            }
        }
        int leftover = money - (min1 + min2);
        return (leftover < 0)? money: leftover;
    }
}

/*------------------------------
  Time Complexity: O(nlog(n))
  Space Complexity: O(1)
-------------------------------*/ 
class Solution {
    public int buyChoco(int[] prices, int money) {
        Arrays.sort(prices);
        int leftover = money - (prices[0] + prices[1]);
        return (leftover < 0)? money : leftover;
    }
}
