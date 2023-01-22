package main

import "sort"

func main() {
	
}

func twoCitySchedCost(costs [][]int) int {
    sort.Slice(costs, func(a, b int) bool { return costs[a][1] - costs[a][0] < costs[b][1] - costs[b][0]});

	n ,totalCost := len(costs) / 2, 0
	for i := 0; i < n ; i++ {
		totalCost += costs[i][1] + costs[i +n][0]
	}
	return totalCost
}