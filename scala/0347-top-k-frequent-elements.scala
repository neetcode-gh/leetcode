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

    // using `groupBy` and only `one` Mutable Collection.
    def topKFrequent2(nums: Array[Int], k: Int): Array[Int] = {

        val frequencyArray = Array.fill(nums.length + 1)(ArrayBuffer.empty[Int])

        val groupedNums = nums.groupBy(identity).mapValues(_.length)

        groupedNums.foreach { case (num, len) => frequencyArray(len) += num }

        frequencyArray.flatten.takeRight(k)

    }
}