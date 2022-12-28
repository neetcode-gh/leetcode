public class Solution {
    public int[] CountBits(int n) {
        var hammingWeights = new int[n+1];
        for (int i = 0; i <= n; i++)
        {
            var binary = Convert.ToString(i, 2);
            var hammingWeight = 0;
            for (int j = 0; j < binary.Length; j++)
            {
                hammingWeight += binary[j] - '0';
            }
            hammingWeights[i] = hammingWeight;
        }
        return hammingWeights;
    }
}