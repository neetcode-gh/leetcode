import scala.collection.mutable.HashSet

object Solution {
  def containsDuplicate(nums: Array[Int]): Boolean = {
    var seen: HashSet[Int] = HashSet()
    for (num <- nums) {
      if (seen.contains(num)) return true
      seen.add(num)
    }
    return false
  }

  // using group by and filter
  def containDupsOneLiner(nums: Array[Int]): Boolean = {
    val dups = nums.groupBy(identity).filter(grps => grps._2.length > 1)
    dups.nonEmpty
  }

}