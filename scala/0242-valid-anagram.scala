// Time Complexity: O(s + t)
// Space Comeplexity: O(s + t)

import scala.collection.mutable.Map

object Solution {
  def isAnagram(s: String, t: String): Boolean = {
    if (s.length() != t.length())
      return false

    var charCount = Map[Char, Int]()

    for (c <- s) {
      if (charCount.contains(c))
        charCount(c) = charCount(c) + 1
      else
        charCount += (c -> 1)
    }

    for (c <- t) {
      if (charCount.contains(c))
        charCount(c) = charCount(c) - 1
      else
        charCount += (c -> 1)
    }

    for ((_, v) <- charCount)
      if (v != 0)
        return false

    return true
  }

  //by maintaing an array of length 26 and using only 1 for loop
  def isAnagram2(s: String, t: String): Boolean = {
    if(s.length != t.length)
      return false

    val arr = Array.fill[Int](26)(0)

    val idx = (ch: Char) => ch - 'a'  // can alternatively be written as: val idx = (_: Char) - 'a'

    for (i <- s.indices) {
      arr(idx(s(i))) += 1
      arr(idx(t(i))) -= 1
    }

    arr.forall(_ == 0)
  }
}
