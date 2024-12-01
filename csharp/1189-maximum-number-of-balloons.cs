public class Solution {
    public int MaxNumberOfBalloons(string text) {
        var charCounts = text.GroupBy(c => c)
                        .ToDictionary(g => g.Key, g => g.Count());
        var balloonCounts = "balloon".GroupBy(c => c)
                        .ToDictionary(g => g.Key, g => g.Count());
        
        int result = text.Length;
        foreach (var balloonCount in balloonCounts) {
            if (charCounts.ContainsKey(balloonCount.Key)) {
                result = Math.Min(result, charCounts[balloonCount.Key] / balloonCount.Value);
            } else {
                result = 0;
                break;
            }
        }
        return result;
    }
}