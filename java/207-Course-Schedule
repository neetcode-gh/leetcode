class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
    Map<Integer, List<Integer>> adjList = new HashMap<Integer, List<Integer>>();
    int[] indegree = new int[numCourses];
   
      //creating the adjlist
    for (int i = 0; i < prerequisites.length; i++) {
      int post = prerequisites[i][0];
      int pre = prerequisites[i][1];
      List<Integer> lst = adjList.getOrDefault(pre, new ArrayList<Integer>());
      lst.add(post);
      adjList.put(pre, lst);

      indegree[post] += 1;
    }

    Queue<Integer> q = new LinkedList<Integer>();
    for (int i = 0; i < numCourses; i++) {
      if (indegree[i] == 0) {
        q.add(i);
      }
    }

    int i = 0;
    while (!q.isEmpty()) {
      int node = q.remove();
        i++;
   
      if (adjList.containsKey(node)) {
        for (Integer neighbor : adjList.get(node)) {
          indegree[neighbor]--;

          if (indegree[neighbor] == 0) {
            q.add(neighbor);
          }
        }
      }
    }

    if (i == numCourses) {
      return true;
    }

    return false;
  }
    
}
