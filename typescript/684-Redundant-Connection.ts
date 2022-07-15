function findRedundantConnection(edges: number[][]): number[] {
  const parent = new Array(edges.length + 1).fill(0).map((_, index) => index);
  const rank = new Array(edges.length + 1).fill(1);

  function find(n: number) {
    let p = parent[n];

    while (p != parent[p]) {
      parent[p] = parent[parent[p]];
      p = parent[p];
    }
    return p;
  }

  function union(n1: number, n2: number) {
    let p1 = find(n1);
    let p2 = find(n2);

    if (p1 == p2) return false;

    if (rank[p1] > rank[p2]) {
      parent[p2] = p1;
      rank[p1] += rank[p2];
    } else {
      parent[p1] = p2;
      rank[p2] += rank[p1];
    }
    return true;
  }
  for (const [n1, n2] of edges) {
    if (!union(n1, n2)) {
      return [n1, n2];
    }
  }
}
