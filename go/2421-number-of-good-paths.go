package main

import "sort"

func main() {

}

type UnionFind struct {
	parent []int
	rank   []int
}

func Constructor(n int) UnionFind {
	parent := make([]int, n)
	rank := make([]int, n)

	for i := 0; i < n; i++ {
		parent[i] = i
		rank[i] = 1
	}
	return UnionFind{
		parent, rank,
	}
}

func (u *UnionFind) find(i int) int {
	for i != u.parent[i] {
		u.parent[i] = u.parent[u.parent[i]]
		i = u.parent[i]
	}

	return i
}

func (u *UnionFind) union(a, b int) bool {
	aRoot, bRoot := u.find(a), u.find(b)

	if aRoot == bRoot {
		return false
	}

	if u.rank[aRoot] < u.rank[bRoot] {
		u.parent[aRoot] = bRoot
		u.rank[bRoot] += u.rank[aRoot]
	} else {
		u.parent[bRoot] = aRoot
		u.rank[aRoot] += u.rank[bRoot]
	}

	return true
}

func getAdjList(edges [][]int) map[int][]int {
	adj := make(map[int][]int)

	for _, edge := range edges {
		a, b := edge[0], edge[1]

		adj[a] = append(adj[a], b)
		adj[b] = append(adj[b], a)
	}

	return adj
}

func getValToIndex(vals []int) map[int][]int {
	valToIndex := make(map[int][]int)

	for i, val := range vals {
		valToIndex[val] = append(valToIndex[val], i)
	}

	return valToIndex
}

func numberOfGoodPaths(vals []int, edges [][]int) int {
	adj := getAdjList(edges)
	valToIndex := getValToIndex(vals)

	res := 0
	uf := Constructor(len(vals))

	keys := make([]int, 0, len(valToIndex))
	for k := range valToIndex {
		keys = append(keys, k)
	}
	sort.Ints(keys)

	for _, val := range keys {
		for _, i := range valToIndex[val] {
			for _, nei := range adj[i] {
				if vals[nei] <= vals[i] {
					uf.union(nei, i)
				}
			}
		}

		count := make(map[int]int)

		for _, i := range valToIndex[val] {
			count[uf.find(i)] += 1
			res += count[uf.find(i)]
		}
	}

	return res
}