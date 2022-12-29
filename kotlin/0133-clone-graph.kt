//recursive version
class Solution {
    fun cloneGraph(node: Node?): Node? {
        if(node == null)
            return null
        val hm = HashMap<Node, Node>()    
        return clone_dfs(hm, node)
    }
    private fun clone_dfs(hm: HashMap<Node,Node>, oldNode: Node?): Node?{
        if(hm.contains(oldNode))
            return hm.get(oldNode)
        val copy = Node(oldNode!!.`val`)
        hm[oldNode] = copy
        for(n in oldNode.neighbors)
            copy.neighbors.add(clone_dfs(hm, n))         
        return copy
    }
}

//dfs with queue
class Solution {
    fun cloneGraph(node: Node?): Node? {
        if(node == null)
            return null       
        val hm = HashMap<Node, Node>()  
        val q = ArrayDeque<Node>()      
        q.add(node)
        hm[node] = Node(node!!.`val`)
        while(!q.isEmpty()){
            val current = q.poll()
            for(n in current.neighbors){
                if(!hm.contains(n)){
                    val copy = Node(n!!.`val`)
                    hm[n] = copy
                    q.add(n)
                }
                hm[current]!!.neighbors.add(hm[n])
            }
        }            
        return hm[node]
    }
}

//bfs with queue
class Solution {
    fun cloneGraph(node: Node?): Node? {
        if(node == null)
            return null       
        val hm = HashMap<Node, Node>()  
        val q = ArrayDeque<Node>()      
        q.addLast(node)
        hm[node] = Node(node!!.`val`)
        while(!q.isEmpty()){
            val current = q.removeLast()
            for(n in current.neighbors){
                if(!hm.contains(n)){
                    val copy = Node(n!!.`val`)
                    hm[n] = copy
                    q.add(n)
                }
                hm[current]!!.neighbors.add(hm[n])
            }
        }            
        return hm[node]
    }
}
