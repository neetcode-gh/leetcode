func countComponents(n int, edges [][]int) int {
    var parent []int
    
    for i:=0; i< n; i++ {
        parent = append(parent, -1)
    }
    
    // current number disjoint sets
    count := n
    for i:=0; i< len(edges); i++ {
        x := findParent(edges[i][0], &parent)
        y := findParent(edges[i][1], &parent)
        
        if x == y && x >= 0 {
            continue
        } else {
            parent[x] = y 
            count-- // decreasing count of disjoint sets as two diff components gets connected
        }
    }
    
    return count
}


func findParent(i int, parent *[]int) int {
    if (*parent)[i] == -1 {
        return i
    }
    
    (*parent)[i] = findParent((*parent)[i], parent)
    
    return (*parent)[i]
}