/**
Solution using min heap
 */
class Solution {
    fun kClosest(points: Array<IntArray>, k: Int): Array<IntArray> {
        val minHeap = PriorityQueue<IntArray> { a, b -> a[0] - b[0] }
        val result = Array<IntArray>(k) { IntArray(2) { 0 } }
        
        for (point in points) {
            minHeap.add(
                intArrayOf(
                    /* distance from (0,0) */ point[0].squared() + point[1].squared(),
                    /* x coordinate */ point[0],
                    /* y coordinate */ point[1]
                )
            )
        }

        for (i in 0 until k) {
            val pointWithDistance = minHeap.poll()
            result[i][0] = pointWithDistance[1]
            result[i][1] = pointWithDistance[2]
        }

        return result
    }

    private fun Int.squared() = this * this
}

/**
Solution using a max Heap
 */
 class Solution {
    fun kClosest(points: Array<IntArray>, k: Int): Array<IntArray> {
        val maxHeap = PriorityQueue<IntArray>{ e1, e2 -> e2[0] - e1[0] }
        val res = Array(k){ IntArray(2) }
        for(point in points){
            val (x,y) = point
            val distance =  (x * x) + (y * y) // we don't need to sqrt since the actual length is of no use
            maxHeap.add(intArrayOf(distance,x,y))
            if(maxHeap.size > k) // keep only the K closest distances
                maxHeap.poll()
        }
        
        for(i in res.indices){
            val (d,x,y) = maxHeap.poll()
            res[i] = intArrayOf(x,y)
        }
        return res
    }
}

 /**
Solution using QuickSelect
 */
 class Solution {
    fun kClosest(points: Array<IntArray>, k: Int): Array<IntArray> {
        if(points.size == k)
            return points
        val res = Array(k){ IntArray(2) }
        quickSelect(0, points.size-1,points,k)
        for(i in res.indices){
            res[i] = points[i]
        }
        return res
    }
    private fun quickSelect(l: Int, r: Int, points: Array<IntArray>, k: Int){
        var lPointer = l
        for(i in l until r){
            if(distance(i, points) <= distance(r,points)){ //r is pivot
                swap(i,lPointer,points)
                lPointer++
            }
        }
        swap(lPointer,r,points)
        if(lPointer > k)
            quickSelect(l, lPointer-1, points, k)
        else if(lPointer < k)
            quickSelect(lPointer+1, r, points, k)
        else //lPointer == k
            return
    }
    private fun swap(i: Int, j: Int, points: Array<IntArray>){
        val temp = points[i]
        points[i] = points[j]
        points[j] = temp
    }
    private fun distance(i: Int, points: Array<IntArray>) = (points[i][0] * points[i][0]) + (points[i][1] * points[i][1])
}
 

/**
Solution using built in sort function
 */
class Solution {
    fun kClosest(points: Array<IntArray>, k: Int): Array<IntArray> {
        val sorted = points.sortedBy{ it[0]*it[0] + it[1]*it[1]}
        val list = arrayListOf<IntArray>()
        for (i in 0..k-1) {
            list.add(sorted[i])
        }
        return list.toTypedArray()
    }
}
