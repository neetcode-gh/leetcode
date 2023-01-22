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
}
