public class Solution {
    public int HammingWeight(uint n) {
        var binary = Convert.ToString(n, 2);
        var hammingWeight = 0;
        for (int i = 0; i < binary.Length; i++)
        {
            hammingWeight += binary[i] - '0';
        }
        return hammingWeight;
    }
}