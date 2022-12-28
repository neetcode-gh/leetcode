import scala.collection.mutable

object Solution {
  def twoSum(nums: Array[Int], target: Int): Array[Int] = {
    val numsWithIndex = nums.zipWithIndex
    val targets = numsWithIndex.toMap

    def compliment(v: Int): Option[Int] = targets.get(target - v)

    numsWithIndex
      .find { case (v, i) => !compliment(v).forall(_ == i) }
      .map { case (v, i) => Array(i, compliment(v).get) }
      .orNull
  }

  /**
   * Optimization of above solution to do it in "one pass"
   * i.e. build the map as we traverse the input collection
   */
  def twoSumOnePass(nums: Array[Int], target: Int): Array[Int] = {
    val targets = mutable.Map[Int, Int]()

    for ((v, i) <- nums.zipWithIndex) {
      val answer = targets.get(target - v).map(Array(_, i))
      
      if (answer.nonEmpty)
        return answer.get

      targets.put(v, i)
    }

    null
  }
}