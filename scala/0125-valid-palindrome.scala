object Solution {
  def isPalindrome(s: String): Boolean = {
    val smallCased = s.toLowerCase
    // removing all non-alphanumeric characters
    val notAlphaNumericRegex = """[\W_]""".r
    val toCompareWith = notAlphaNumericRegex.replaceAllIn(smallCased, "")

    val reversed = toCompareWith.reverse
    toCompareWith == reversed
  }
}
