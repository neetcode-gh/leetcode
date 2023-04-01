package kotlin

import java.util.LinkedList

class Solution {
    fun minReorder(n: Int, connections: Array<IntArray>): Int {
        // node -> (adjacentNode,isArtificialEdge)
        val adjacencyList = mutableMapOf<Int, MutableList<Pair<Int, Boolean>>>()
        connections.forEach { (u, v) -> // O(E)
            adjacencyList.getOrPut(u) { mutableListOf() }.add(Pair(v, false))
            adjacencyList.getOrPut(v) { mutableListOf() }.add(Pair(u, true))
        }
        val queue = LinkedList<Int>().apply { add(0) }
        val visitedNodes = hashSetOf<Int>().apply { add(0) }
        var minNumberOfEdgesToReOrient = 0
        while (queue.isNotEmpty()) {
            val removedNode = queue.remove()
            for ((adjacentNode, isConnectedArtificially) in adjacencyList[removedNode] ?: mutableListOf()) {
                if (adjacentNode in visitedNodes) continue
                if (!isConnectedArtificially) minNumberOfEdgesToReOrient++
                visitedNodes.add(adjacentNode)
                queue.add(adjacentNode)
            }
        }
        return minNumberOfEdgesToReOrient
    }
}
