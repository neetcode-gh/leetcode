public class Solution {
   public bool CanFinish(int numCourses, int[][] prerequisites)
        {

            IDictionary<int, List<int>> preMap = new Dictionary<int, List<int>>();
            HashSet<int> visited = new HashSet<int>();
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
                if (!DfsGraph(preMap, visited, c))
                {
                    return false;
                }
            }
            return true; 
        }
        public bool DfsGraph(IDictionary<int, List<int>> preMap, HashSet<int> visited, int crs)
        {
            if (visited.Contains(crs))
            {
                return false;
            }
            if (preMap[crs] == new List<int>())
            {
                return true;
            }
            visited.Add(crs);
            foreach (var pre in preMap[crs])
            {
                if (!DfsGraph(preMap, visited, pre))
                {
                    return false;
                }
            }
            visited.Remove(crs);
            preMap[crs] = new List<int>();
            return true; 
        }
}
