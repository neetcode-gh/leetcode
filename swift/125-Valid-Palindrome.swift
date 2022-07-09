/**
 * Question Link: https://leetcode.com/problems/valid-palindrome/
 */

class ValidPalindrome {
    func isPalindrome(_ s: String) -> Bool {
      var l = 0, r = s.count - 1
      let sChars = Array(s.lowercased())
      
      while l < r {
        while !sChars[l].isAlphanumeric && l < r {
          l += 1
        }
        
        while !sChars[r].isAlphanumeric && l < r {
          r -= 1
        }
        
        if sChars[l] != sChars[r] {
          return false
        } else {
          l += 1
          r -= 1
        }
      }
      return true
    }
}

extension Character {
  var isAlphanumeric : Bool {
    return isLetter || isNumber
  }
}
