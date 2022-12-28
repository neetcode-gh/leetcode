/**
 * Question Link: https://leetcode.com/problems/anagrams/
 */

class GroupAnagrams {
    func groupAnagrams(_ strs: [String]) -> [[String]] {
      var ans = [[Int]:[String]]()
      let a = "a" as Character
    
      for s in strs {
        var count = [Int](repeating: 0, count: 26)
        for c in Array(s) {
            count[Int(c.asciiValue! - a.asciiValue!)] += 1
        }
        ans[count, default: []].append(s)
      }
    return Array(ans.values)
  }
}
