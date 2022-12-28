public class Solution
{
    //Bellman ford algo - T: O(K. E) & S: O(V)
    public int FindCheapestPrice(int n, int[][] flights, int src, int dst, int k)
    {
        var prices = new int[n];
        Array.Fill(prices, int.MaxValue);
        prices[src] = 0;

        for (var time = 0; time < k + 1; time++)
        {
            var tempPrices = prices.Clone() as int[];

            foreach (var item in flights)
            {
                var s = item[0];
                var d = item[1];
                var p = item[2];
                if (prices[s] == int.MaxValue)
                {
                    continue;
                }
                if (prices[s] + p < tempPrices[d])
                {
                    tempPrices[d] = prices[s] + p;
                }
            }
            prices = tempPrices;
        }

        return (prices[dst] == int.MaxValue) ? -1 : prices[dst];
    }
}