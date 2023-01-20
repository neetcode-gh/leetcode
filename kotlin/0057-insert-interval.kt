class Solution {
    fun insert(intervals: Array<IntArray>, newInterval: IntArray): Array<IntArray> {
        val res = ArrayList<IntArray>()
        var added = false
        var index = 0
        for(i in 0 until intervals.size){
            val interval = intervals[i]
            if(newInterval[1] < interval[0]){ //no more overlapping intervals
                res.add(newInterval)
                added = true
                break
            }else if(newInterval[0] > interval[1]){ //non overlapping
                res.add(interval)
            }else{ //overlapping, update the newinterval accordingly
                newInterval[0] = minOf(newInterval[0],interval[0])
                newInterval[1] = maxOf(newInterval[1],interval[1])
            }
            index++
        }
        if(index < intervals.size){ // add all the leftover intervals (after the break)
            for(i in index until intervals.size)
                res.add(intervals[i])
        }
        if(added == false) // takes care of (1) Empty intervals array or 1-sized array with overlapping newinterval
            res.add(newInterval)
        return res.toTypedArray()
    }
}
