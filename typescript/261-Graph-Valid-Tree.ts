interface Obj {
  [key: number]: Array<number>;
}

interface Visited {
  [key: number]: boolean;
}

function validTree(n: number, edges: number[][]): boolean {
  if (n === 0) return true;

  let adjacent: Obj = {};
  let visited: Visited = {};
  for (let i = 0; i < n; i++) {
    adjacent[i] = [];
  }

  for (const val of edges) {
    const [n1, n2] = val;
    adjacent[n1].push(n2);
    adjacent[n2].push(n1);
  }

  return dfs(0, -1, visited, adjacent) && Object.keys(visited).length === n;
}

function dfs(
  node: number,
  prevNode: number,
  visited: Visited,
  adjacent: Obj
): boolean {
  if (visited[node]) return false;
  visited[node] = true;

  for (const ele of adjacent[node]) {
    if (ele === prevNode) continue;
    if (!dfs(ele, node, visited, adjacent)) return false;
  }

  return true;
}
