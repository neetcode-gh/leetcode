object Solution {
    def lengthOfLastWord(s: String): Int = {
    var i = s.length - 1
    var length = 0

    while (s(i) == ' ') {
      i -= 1
    }

    while (i >= 0 && s(i) != ' ') {
      length += 1
      i -= 1
    }

    length
   
    }
}
