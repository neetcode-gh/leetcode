func findRedundantConnection(edges [][]int) []int {
    var res []int
    node:=make(map[int][]int)
    for _,v := range edges{
        visit:=make(map[int]int)
        visit[v[0]]=1
        if isCircle(node, v[1],v[0],visit){
            return v
        }
        node[v[0]]=append(node[v[0]],v[1])
        node[v[1]]=append(node[v[1]],v[0])
    }
    return res
}

func isCircle(m map[int][]int, cur, prev int, visit map[int]int) bool {
    var res bool
    for _,v := range m[cur]{
        if v==prev{
            continue
        }
        visit[v]+=1
        if visit[v] >1{
            return true
        }
        if isCircle(m,v,cur,visit) {
            return true
        }
    }
    return res
}