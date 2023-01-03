class Solution {
    fun leastInterval(tasks: CharArray, n: Int): Int {
        if(n == 0)
            return tasks.size
        val hm = HashMap<Char,Int>()
        for(task in tasks)
            hm[task] = hm.getOrDefault(task, 0) + 1        
        val maxHeap = PriorityQueue<Int>(compareBy{-it})
        for(count in hm.values)
             maxHeap.add(count) 
        val q = ArrayDeque<Pair<Int,Int>>() // time, value
        var time = 0
        while(!maxHeap.isEmpty() || !q.isEmpty()){
            if(!maxHeap.isEmpty()){
                var current = maxHeap.poll()
                current--
                if(current > 0)
                    q.add(Pair(time+n,current))
            }
            if(!q.isEmpty()){
                if(q.peek().first == time)
                    maxHeap.add(q.poll().second)
            }
            time++
        }    
        return time          
    }
}
