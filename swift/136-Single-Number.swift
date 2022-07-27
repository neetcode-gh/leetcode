//BitManipulation Solution O(n), SC(1)
class Solution {
    func singleNumber(_ nums: [Int]) -> Int {
      var ans = 0
      for i in nums {
          ans ^= i
      }
      return ans
    }
}

//HashMapSolution O(n), SC(n)
class Solution {
    func singleNumber(_ nums: [Int]) -> Int {
        var hm: [Int: Int]  = [:]
        for i in nums {
            hm[i,default: 0] += 1
        }
        for i in nums {
            if hm[i] == 1 { return i }
        }
        return -1
    }
}
