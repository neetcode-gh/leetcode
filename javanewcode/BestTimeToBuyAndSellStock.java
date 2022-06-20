package leetcode;

public class BestTimeToBuyAndSellStock {
    public static void main(String[] args) {
       int[] arr = {7,1,5,3,6,4};
       System.out.println(BuyAndSell(arr));

    }

    public static int BuyAndSell(int[] arr){
        int maxProfit =0;
        int min = arr[0];
        for(int i=0; i < arr.length;i++){
            min = Math.min(arr[i],min);
            int profit = arr[i] - min;

            maxProfit = Math.max(profit,maxProfit);

        }
          return maxProfit;

    }

}
