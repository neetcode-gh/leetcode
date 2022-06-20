package leetcode;

public class StockBuyAndSell {
    public static void main(String[] args) {
       int[] arr = {7,1,5,3,6,4};
        System.out.println(buyAndSell(arr));
    }
      static int buyAndSell(int[] arr){
            int maxProfit = 0;
            int minSoFar = arr[0];
            for (int i=0;i<arr.length;i++){
                minSoFar = Math.min(arr[i],minSoFar);
                int profit = arr[i] - minSoFar;

               maxProfit = Math.max(profit,maxProfit);
            }
             return maxProfit;
      }
}
