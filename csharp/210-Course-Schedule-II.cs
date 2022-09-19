public class Solution {
  List<int> output = null;
        public int[] FindOrder(int numCourses, int[][] prerequisites)
        {
            IDictionary<int, List<int>> preMap = new Dictionary<int, List<int>>();
            HashSet<int> visited = new HashSet<int>();
            HashSet<int> cycle = new HashSet<int>();
            output = new List<int>();
            for (int i = 0; i < numCourses; i++)
            {
                preMap.Add(i, new List<int>());
            }

            foreach (int[] course in prerequisites)
            {
                int courseToTake = course[0];
                int courseDependOn = course[1];
                preMap[courseToTake].Add(courseDependOn);
            }

            foreach (int c in Enumerable.Range(0, numCourses))
            {
                if (DfsGraphTopologicalSort(preMap, visited, cycle, c) == false)
                {
                    return Array.Empty<int>();
                }
            }
            return output.ToArray();
        }

        public bool DfsGraphTopologicalSort(IDictionary<int, List<int>> preMap, HashSet<int> visited, HashSet<int> cycle, int crs)
        {
            if (cycle.Contains(crs)) return false;
            if (visited.Contains(crs)) return true;

            if (preMap[crs] == new List<int>())
            {
                return true;
            }
            cycle.Add(crs);
            foreach (var pre in preMap[crs])
            {
                if (DfsGraphTopologicalSort(preMap, visited,cycle, pre)==false)
                {
                    return false;
                }
            }
            cycle.Remove(crs);
            visited.Add(crs);
            output.Add(crs);
            return true;
        }
}
