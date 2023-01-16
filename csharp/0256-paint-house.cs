class Solution
{
    public int MinCost(int[][] costs)
    {
        int[] previousRow = new int[3];
        for (int i = 0; i < costs.Length; i++)
        {
            int currentRowHouse0 = costs[i][0] + Math.Min(previousRow[1], previousRow[2]);
            int currentRowHouse1 = costs[i][1] + Math.Min(previousRow[0], previousRow[2]);
            int currentRowHouse2 = costs[i][2] + Math.Min(previousRow[0], previousRow[1]);
            previousRow[0] = currentRowHouse0;
            previousRow[1] = currentRowHouse1;
            previousRow[2] = currentRowHouse2;
        }
        return Math.Min(Math.Min(previousRow[0], previousRow[1]), previousRow[2]);
    }
}