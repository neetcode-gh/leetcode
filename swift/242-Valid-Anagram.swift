/**
 * Question Link: https://leetcode.com/problems/valid-anagram/
 */

class ValidAnagram {
    func isAnagram(_ s: String, _ t: String) -> Bool {
      if s.count != t.count {
        return false
      }
      var countS = [Int:Int]()
      var countT = [Int:Int]()
      let sChars = Array(s)
      let tChars = Array(t)
      for i in 0..<sChars.count {
          countS[Int(sChars[i].asciiValue!)] = 1 + countS[Int(sChars[i].asciiValue!), default: 0]
          countT[Int(tChars[i].asciiValue!)] = 1 + countT[Int(tChars[i].asciiValue!), default: 0]
      }
      for (key, _) in countS {
          if countS[key] != countT[key, default: 0] {
              return false
          }
      }
      return true
    }
    
    func isAnagramByLengthAndSortCheck(_ s: String, _ t: String) -> Bool {
        
        // if the String lengths don't match, then they cannot be anagrams of each other
        guard s.count == t.count else { return false }
        
        // sorting the String Characters puts them in the same order, which allows us to check equality
        guard s.sorted() == t.sorted() else { return false }
        
        // if both guards succeed, then we have an anagram
        return true
    }
}
