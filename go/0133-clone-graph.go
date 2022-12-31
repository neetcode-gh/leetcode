/**
 * Definition for a Node.
 * type Node struct {
 *     Val int
 *     Neighbors []*Node
 * }
 */

func cloneGraph(node *Node) *Node {
	if node == nil {
		return node
	}
	visited := map[*Node]*Node{}
	return clone(node, visited)
}

func clone(node *Node, visited map[*Node]*Node) *Node {
	if _, ok := visited[node]; ok {
		return visited[node]
	}

	newNode := &Node{Val: node.Val}
	visited[node] = newNode

	for _, n := range node.Neighbors {
		newNode.Neighbors = append(newNode.Neighbors, clone(n, visited))
	}
	return newNode
}
