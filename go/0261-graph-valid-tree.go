/**
 * @param n: An integer
 * @param edges: a list of undirected edges
 * @return: true if it's a valid tree, or false
 */

type DSU struct {
	parents map[int]int
}

func NewDSU(n int) *DSU {
	parents := make(map[int]int)
	for i := 0; i < n; i++ {
		parents[i] = i
	}
	return &DSU{
		parents: parents,
	}
}

func (this *DSU) find(u int) int {
	u = this.parents[u]
	for u != this.parents[u] {
		u = this.parents[this.parents[u]]
	}
	return u
}

func (this DSU) union(u, v int) bool {
	u, v = this.find(u), this.find(v)
	if u == v {
		return false
	}
	this.parents[u] = v
	return true
}

func ValidTree(n int, edges [][]int) bool {
	// write your code here
	if len(edges) != n-1 {
		return false
	}
	dsu := NewDSU(n)
	for _, edge := range edges {
		if !dsu.union(edge[0], edge[1]) {
			return false
		}
	}
	return true
}
