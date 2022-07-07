/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean}
 */
var validTree = function (n, edges) {
  if (n === 0) return true

  let adjacent = {}
  let visited = {}
  for (let i = 0; i < n; i++) {
    adjacent[i] = []
  }

  for (const val of edges) {
    const [n1, n2] = val
    adjacent[n1].push(n2)
    adjacent[n2].push(n1)
  }

  return dfs(0, -1, visited, adjacent) && Object.keys(visited).length === n
}

function dfs(node, prevNode, visited, adjacent) {
  if (visited[node]) return false
  visited[node] = true

  for (const ele of adjacent[node]) {
    if (ele === prevNode) continue
    if (!dfs(ele, node, visited, adjacent)) return false
  }

  return true
}

// Second method using union Find

class Node {
  constructor(props) {
    this.root = []
    this.range = []
    for (let i = 0; i < props; i++) {
      this.root[i] = i
      this.range[i] = 1
    }
  }

  find(x) {
    if (x === this.root[x]) return x
    this.root[x] === this.find(this.root[x])
    return this.root[x]
  }

  union(x, y) {
    let rootX = this.find(x)
    let rootY = this.find(y)
    if (rootX !== rootY) {
      // this.count--
      if (this.range[rootY] > this.range[rootX]) {
        this.root[rootX] = rootY
      } else if (this.range[rootX] > this.range[rootY]) {
        this.root[rootY] = rootX
      } else {
        this.root[rootX] = rootY
        this.range[rootY] += 1
      }

      return true
    }
    return false
  }
}

var validTree = function (n, edges) {
  if (edges.length !== n - 1) return false

  let uFind = new Node(n)

  for (let ele of edges) {
    if (!uFind.union(ele[0], ele[1])) return false
  }
  return true
}
