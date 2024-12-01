class Solution {
    fun minimumFuelCost(roads: Array<IntArray>, seats: Int): Long {

        var result = 0.0
        if (roads.size == 0) return result.toLong()

        val adj = HashMap<Int, ArrayList<Int>>()
        for (road in roads){
            adj[road[0]] = adj.getOrDefault(road[0], ArrayList<Int>()).apply { this.add(road[1]) }
            adj[road[1]] = adj.getOrDefault(road[1], ArrayList<Int>()).apply { this.add(road[0]) }
        } 
        
        fun dfs(node: Int, parent: Int): Double {

            var passengers = 0.0
            var res = 0.0
            for (child in adj[node]!!) {
                if (child != parent) {
                    val childPassengers = dfs(child, node)
                    passengers += childPassengers
                    result += Math.ceil(childPassengers / seats)
                }
            }

            return passengers + 1.0
        }

        dfs(0, -1)
        return result.toLong()
    }
}
