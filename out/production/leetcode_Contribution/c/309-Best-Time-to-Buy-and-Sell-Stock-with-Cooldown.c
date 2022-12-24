int maxProfit(int* prices, int pricesSize){
    int sold = 0;
    int hold = INT_MIN;
    int rest = 0;
    
    for (int i = 0; i < pricesSize; i++) {
        int prevSold = sold;
        sold = hold + prices[i];
        hold = max(hold, rest - prices[i]);
        rest = max(rest, prevSold);
    }
    return max(sold, rest);
}

// C doesn't have a built-in max function
int max(int a, int b) {
    return (a > b) ? a : b;
}