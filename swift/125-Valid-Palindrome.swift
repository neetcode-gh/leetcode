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
    
    func isPalindromeByFilteringAndReversing(_ s: String) -> Bool {
        
        // after only allowing alphanumerics and lowercasing the entire String...
        let allowedCharacters = NSCharacterSet.letters.union(.alphanumerics)
        let lowercasedString = s.lowercased()
        let filteredString = String(lowercasedString.unicodeScalars.filter(allowedCharacters.contains))
        
        // check if the String is equal to itself reversed
        guard filteredString == String(filteredString.reversed()) else { return false }
        return true
    }
}

extension Character {
  var isAlphanumeric : Bool {
    return isLetter || isNumber
  }
}
