class Solution {
    fun getOrder(tasks: Array<IntArray>): IntArray {
        val res = mutableListOf<Int>()
        val sorted = Array(tasks.size){ IntArray(3) }
        for(i in tasks.indices){
            sorted[i][0] = tasks[i][0]
            sorted[i][1] = tasks[i][1]
            sorted[i][2] = i
        }
        sorted.sortBy{it -> it[0]}
        val pq: PriorityQueue<IntArray> = PriorityQueue{a, b ->
            if(a[0] == b[0]) a[1] - b[1]
            else a[0] - b[0]
        }
        var time = sorted[0][0]; var index = 0
        while(!pq.isEmpty() || index < sorted.size){
            while(index < sorted.size && time >= sorted[index][0]){
                pq.offer(intArrayOf(sorted[index][1],sorted[index][2]))
                index++
            }
            if(!pq.isEmpty()){
                val (pT, i) = pq.poll()
                time += pT
                res.add(i)
            }else{
                time = sorted[index][0]
            }
        }
        return res.toIntArray()
    }
}
