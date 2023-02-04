import scala.collection.mutable.{HashMap, PriorityQueue, ListBuffer, ArrayBuffer}

object Solution {
    def topKFrequent(nums: Array[Int], k: Int): Array[Int] = {
        val map = getNumCountMap(nums)
        val arr = Array.fill(nums.length + 1)(ListBuffer[Int]())
        map.foreach{case (num, count) => arr(count) += num}
        arr.reverseIterator.flatten.take(k).toArray
    }

    def getNumCountMap(nums: Array[Int]): HashMap[Int, Int] = {
        val map = HashMap[Int, Int]()
        nums.foreach(num => {
            map(num) = map.getOrElse(num, 0) + 1
        })
        
        map
    }
}