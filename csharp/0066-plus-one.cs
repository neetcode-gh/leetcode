public class Solution {
    public int[] PlusOne(int[] digits) {
        string n = string.Join("", digits);
        n = (BigInteger.Parse(n) + 1).ToString();
        int[] result = new int[n.Length];
        for (int i = 0; i < n.Length; i++)
        {
            result[i] = n[i] - '0';
        }
        return result;
    }
}