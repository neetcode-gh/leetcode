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
}