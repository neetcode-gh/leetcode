import scala.collection.mutable.PriorityQueue

object Solution {
    def findKthLargest(nums: Array[Int], k: Int): Int = {
        val pq = PriorityQueue.empty(Ordering[Int].reverse)
        for(i <- 0 until nums.size){
            if (i < k) pq.enqueue(nums(i))
            else {
                pq.enqueue(nums(i))
                pq.dequeue()
            }
        }
        pq.dequeue()
    }
}
