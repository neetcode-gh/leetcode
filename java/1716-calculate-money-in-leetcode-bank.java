/*-------------------------------
  Time complexity: O(1)
  Space Complexity: O(1)
-------------------------------*/
class Solution {
    public int totalMoney(int n) {
        int weeks = n / 7;;
        int low = 28;
        int high = 28 + 7 * (weeks - 1);
        int res = (weeks * (low + high) / 2);

        int monday = weeks + 1;
        for(int i = 0; i < n % 7; i++)
            res += i + monday;
        
        return res;    
    }
}

/*-------------------------------
  Time complexity: O(n)
  Space Complexity: O(1)
-------------------------------*/
class Solution {
    public int totalMoney(int n) {
        int day = 0;
        int deposit = 1;
        int res = 0;

        while(day < n){
            res += deposit;
            deposit += 1;
            day += 1;

            if(day % 7 == 0)
                deposit = 1 + day/7;
        }
        return res;
    }
}

