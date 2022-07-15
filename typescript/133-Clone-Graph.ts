/**
 * Definition for Node.
 * class Node {
 *     val: number
 *     neighbors: Node[]
 *     constructor(val?: number, neighbors?: Node[]) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.neighbors = (neighbors===undefined ? [] : neighbors)
 *     }
 * }
 */

function cloneGraph(node: Node | null): Node | null {
  const oldToNew = new Map<Node, Node>();

  function clone(node: Node) {
    if (oldToNew.has(node)) {
      return oldToNew.get(node) as Node | null;
    }

    const copy = new Node(node.val);
    oldToNew.set(node, copy);
    for (const nei of node.neighbors) {
      copy.neighbors.push(clone(nei)!);
    }

    return copy;
  }

  return node ? clone(node) : null;
}
