import scala.collection.mutable

object Solution {
  def lengthOfLongestSubstring(s: String): Int = {
    val charMap = mutable.Map[Character, Int]()
    var longest = 0
    var left = 0
    var right = left

    while (right < s.length) {
      if (charMap.get(s(right)).exists(_ >= left)) {
        longest = Math.max(longest, right - left)

        left += 1
      }
      else {
        charMap.put(s(right), right)
        right += 1
      }
    }

    Math.max(longest, right - left)
  }
}