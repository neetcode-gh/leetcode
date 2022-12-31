public class Solution {
    public bool CarPooling(int[][] trips, int capacity) {
          var dictionary = new SortedDictionary<int, int>();

            foreach (var trip in trips)
            {
                if (!dictionary.ContainsKey(trip[1])) dictionary[trip[1]] = 0;
                if (!dictionary.ContainsKey(trip[2])) dictionary[trip[2]] = 0;
                dictionary[trip[1]] += trip[0]; dictionary[trip[2]] -= trip[0];
            }
            int currentPassennger = 0;
           foreach (var keyval in dictionary)
            {
                currentPassennger += keyval.Value;
                if (currentPassennger > capacity) return false;
            }
            return true;
    }
}
