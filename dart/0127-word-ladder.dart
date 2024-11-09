class Solution {
  List<int> findRedundantConnection(List<List<int>> edges) {
    List<int> parent = [];
    for (int i = 0; i < edges.length + 1; i++) {
      parent.add(i);
    }

    List<int> sizes = List.filled(edges.length + 1, 1);

    int find(int n) {
      int p = parent[n];

      while (p != parent[p]) {
        parent[p] = parent[parent[p]];
        p = parent[p];
      }

      return p;
    }

    bool union(int node1, int node2) {
      int parentOf1 = find(node1);
      int parentOf2 = find(node2);

      if (parentOf1 == parentOf2) {
        return false;
      } else if (sizes[parentOf1] > sizes[parentOf2]) {
        parent[parentOf2] = parentOf1;
        sizes[parentOf1] += sizes[parentOf2];
      } else {
        parent[parentOf1] = parentOf2;
        sizes[parentOf2] += sizes[parentOf1];
      }

      return true;
    }

    for (List<int> edge in edges) {
      int node1 = edge[0];
      int node2 = edge[1];
      if (!union(node1, node2)) {
        return [node1, node2];
      }
    }

    return [];
  }
}