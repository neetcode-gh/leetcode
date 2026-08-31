import scala.collection.mutable.{Map => MMap}
object Solution {
  def topKFrequent(nums: Array[Int], k: Int): Array[Int] = {
    // number -> count
    val numberCountMap: MMap[Int, Int] = MMap[Int, Int]()
    def traverseAndUpdateMap(rem: Array[Int]): Unit = {
      if(rem.isEmpty) ()
      else {
        numberCountMap.updateWith(rem.head) {
          case Some(value) => Some(value + 1)
          case None => Some(1)
        }
        traverseAndUpdateMap(rem.tail)
      }
    }

    implicit val ordering: Ordering[(Int, Int)] = {
      Ordering.by[(Int, Int), Int](_._2).reverse
    }

    traverseAndUpdateMap(nums)

    numberCountMap
      .toArray
      .sorted
      .take(k)
      .map(_._1)
  }
}
