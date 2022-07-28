func validTree(n int, edges [][]int) bool {
    if len(edges) != n-1 {
        return false
    }
    
    seen := make(map[int]bool)
    g := make(map[int][]int)
    
    for _, edge := range edges {
        g[edge[0]] = append(g[edge[0]], edge[1])
        g[edge[1]] = append(g[edge[1]], edge[0])
    }
    
    dfs(0, seen, g)
    
    return len(seen) == n
}

func dfs(u int, seen map[int]bool, g map[int][]int) {
    if _, ok := seen[u]; ok {
        return
    }
    seen[u] = true
    
    for _, v := range g[u] {
        dfs(v, seen, g)
    }
}