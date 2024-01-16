public class Solution
{
    public string MergeAlternately(string word1, string word2)
    {
        var result = string.Empty;
        var firstPointer = 0;
        var secondPointer = 0;
        while (firstPointer < word1.Length || secondPointer < word2.Length)
        {
            if (firstPointer < word1.Length)
                result += word1[firstPointer++];

            if (secondPointer < word2.Length)
                result += word2[secondPointer++];
        }
        return result;
    }
}