/**
 * Question Link: https://leetcode.com/problems/permutation-in-string/
 */

 class PermutationInString {
    func checkInclusion(_ s1: String, _ s2: String) -> Bool {
        if s1.count > s2.count {
            return false
        }

        var s1Array = Array(s1)
        var s2Array = Array(s2)
        var arr1 = [Int](repeating: 0, count: 26)
        var arr2 = [Int](repeating: 0, count: 26)

        for i in 0..<s1Array.count {
            arr1[Int(s1Array[i].asciiValue! - Character("a").asciiValue!)] += 1
            arr2[Int(s2Array[i].asciiValue! - Character("a").asciiValue!)] += 1
        }

        var matches = 0
        for i in 0..<26 {
            if arr1[i] == arr2[i] {
                matches += 1
            }
        }

        var l = 0
        for r in s1Array.count..<s2Array.count {
            if matches == 26 {
                return true
            }

            var index = Int(s2Array[r].asciiValue! - Character("a").asciiValue!)
            arr2[index] += 1
            if arr1[index] == arr2[index] {
                matches += 1
            } else if arr1[index] + 1 == arr2[index] {
                matches -= 1
            }

            index = Int(s2Array[l].asciiValue! - Character("a").asciiValue!)
            arr2[index] -= 1
            if arr1[index] == arr2[index] {
                matches += 1
            } else if arr1[index] - 1 == arr2[index] {
                matches -= 1
            }

            l += 1
        }

        return matches == 26
    }
}