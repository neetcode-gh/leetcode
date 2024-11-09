public class Solution {
    public int LeastBricks(IList<IList<int>> wall) {
        Dictionary<int, int> countGap = new Dictionary<int, int>();
        countGap[0] = 0;

        foreach (var row in wall) {
            int total = 0;
            for (int i = 0; i < row.Count - 1; i++) {
                int brick = row[i];
                total += brick;
                if (!countGap.ContainsKey(total)) {
                    countGap[total] = 0;
                }
                countGap[total]++;
            }
        }

        return wall.Count - countGap.Values.Max();
    }
}
